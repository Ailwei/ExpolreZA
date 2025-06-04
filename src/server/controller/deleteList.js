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
const deleteListController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { listId, userId } = req.body;
        if (!listId || !userId) {
            return res.status(400).json({ error: "listId and userId are required" });
        }
        const list = yield database_1.default.list.findFirst({
            where: { id: listId, userId: userId },
            include: { favourites: true }
        });
        if (!list) {
            return res.status(404).json({ error: "List not found" });
        }
        if (list.favourites && list.favourites.length > 0) {
            yield database_1.default.favourite.deleteMany({
                where: { listId: listId }
            });
        }
        yield database_1.default.list.delete({
            where: { id: listId }
        });
        return res.status(200).json({ message: "List and its favourites deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting list:", error);
        return res.status(500).json({ error: "Failed to delete list" });
    }
});
exports.default = deleteListController;
