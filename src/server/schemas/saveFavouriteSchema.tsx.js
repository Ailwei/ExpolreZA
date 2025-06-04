"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFavouriteSchema = void 0;
const zod_1 = require("zod");
exports.saveFavouriteSchema = zod_1.z.object({
    listId: zod_1.z.string().uuid({ message: "Invalid list ID" }),
    activityId: zod_1.z.string().uuid({ message: "Invalid activity ID" }),
});
