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
const removeFavouritesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { listId, activityId } = req.body;
        if (!listId || !activityId) {
            return res.status(400).json({ error: "listId and activityId are required" });
        }
        const favourite = yield database_1.default.favourite.findFirst({
            where: { listId, activityId }
        });
        if (!favourite) {
            return res.status(404).json({ error: "Favourite not found" });
        }
        yield database_1.default.favourite.delete({
            where: { id: favourite.id }
        });
        return res.status(200).json({ message: "Favourite removed successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: "Failed to remove favourite" });
    }
});
exports.default = removeFavouritesController;
