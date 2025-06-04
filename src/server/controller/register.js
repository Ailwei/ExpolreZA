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
const registerSchema_1 = require("../schemas/registerSchema");
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parseResult = registerSchema_1.registerSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: parseResult.error.errors.map(e => ({
                    field: e.path[0],
                    message: e.message
                }))
            });
        }
        const { email, password, firstName, lastName } = parseResult.data;
        const existingUser = yield database_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield database_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName
            }
        });
        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    }
    catch (error) {
        console.error('Error in registerController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = registerController;
