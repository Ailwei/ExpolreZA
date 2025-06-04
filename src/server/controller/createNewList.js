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
const createListSchema_1 = require("../schemas/createListSchema");
const createNewListController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Received from frontend:", req.body);
        const parseResult = createListSchema_1.createListSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: parseResult.error.errors.map(e => ({
                    field: e.path[0],
                    message: e.message
                }))
            });
        }
        const userId = req.body.userId;
        if (!userId) {
            return res.status(401).json({ message: "User Id is required" });
        }
        const { listName, description, privateLevel } = parseResult.data;
        const addList = yield database_1.default.list.create({
            data: {
                listName,
                description,
                userId,
                privateLevel
            }
        });
        console.log("List created successfully:", addList);
        return res.status(201).json(addList);
    }
    catch (error) {
        console.error("Error in createNewList:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = createNewListController;
