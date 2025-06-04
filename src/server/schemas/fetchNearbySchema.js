"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchNearbySchema = void 0;
const zod_1 = require("zod");
exports.fetchNearbySchema = zod_1.z.object({
    latitude: zod_1.z.number(),
    longitude: zod_1.z.number(),
    type: zod_1.z.string().optional(),
});
