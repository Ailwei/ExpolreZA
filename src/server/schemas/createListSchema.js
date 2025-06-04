"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createListSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createListSchema = zod_1.default.object({
    listName: zod_1.default.string().min(1, { message: "Name is required" }),
    description: zod_1.default.string().min(1, { message: "Description is required" }),
    privateLevel: zod_1.default.enum(["Public", "Private", "FollowersOnly"], {
        errorMap: () => ({ message: "Privacy level is required" }),
    }),
});
