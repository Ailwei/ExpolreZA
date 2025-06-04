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
const saveFavouriteSchema_tsx_1 = require("../schemas/saveFavouriteSchema.tsx");
const saveFavoritesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parseResul = saveFavouriteSchema_tsx_1.saveFavouriteSchema.safeParse(req.body);
        if (!parseResul.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: parseResul.error.errors.map(e => ({
                    field: e.path[0],
                    message: e.message
                }))
            });
        }
        const userId = req.body.userId;
        const { listId, activityId } = parseResul.data;
        const list = yield database_1.default.list.findUnique({ where: { id: listId } });
        if (!list || list.userId !== userId) {
            return res.status(403).json({ message: "Not authorized to add to this list" });
        }
        const favourite = yield database_1.default.favourite.create({
            data: {
                listId,
                activityId,
            }
        });
        console.log("Favourite saved:", favourite);
        console.log("User ID:", userId);
        console.log("List ID:", listId);
        console.log("Activity ID:", activityId);
        return res.status(201).json({ message: "Favourite saved", favourite });
    }
    catch (error) {
        console.error("Error in saveFavoritesController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = saveFavoritesController;
