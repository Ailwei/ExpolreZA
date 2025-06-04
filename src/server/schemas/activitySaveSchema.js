"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activitySaveSchema = void 0;
const zod_1 = require("zod");
exports.activitySaveSchema = zod_1.z.object({
    locationKey: zod_1.z.string().min(1, "Location key is required"),
    data: zod_1.z.object({
        locationName: zod_1.z.string().min(1, "Location name is required"),
        place_id: zod_1.z.string().optional(),
        types: zod_1.z.array(zod_1.z.string()).optional(),
        geometry: zod_1.z.object({
            location: zod_1.z.object({
                lat: zod_1.z.number(),
                lng: zod_1.z.number(),
            }),
        }).optional(),
        formatted_address: zod_1.z.string().optional(),
        rating: zod_1.z.number().optional(),
        user_ratings_total: zod_1.z.number().optional(),
        photos: zod_1.z.array(zod_1.z.object({
            photo_reference: zod_1.z.string(),
            height: zod_1.z.number(),
            width: zod_1.z.number(),
        })).optional(),
    }),
    timestamp: zod_1.z.string().optional(),
});
