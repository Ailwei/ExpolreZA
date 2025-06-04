"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../db/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginSchema_1 = require("../schemas/loginSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!JWT_SECRET) {
            return res.status(500).json({ message: "JWT secret is not configured" });
        }
        const parseResult = loginSchema_1.loginSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: parseResult.error.errors.map(e => ({
                    field: e.path[0],
                    message: e.message
                }))
            });
        }
        const { email, password } = parseResult.data;
        const user = yield database_1.default.user.findUnique({
            where: {
                email
            }
        });
        if (!user || !user.password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({ message: "Login successful", token, user: { email: user.email, firstName: user.firstName, lastName: user.lastName } });
    }
    catch (error) {
        console.error("Error in loginController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = loginController;
