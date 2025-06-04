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
const zod_1 = require("zod");
const activitySaveSchema_1 = require("../schemas/activitySaveSchema");
const activitiesSchema = zod_1.z.array(activitySaveSchema_1.activitySaveSchema);
const cacheActivitiesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parseResult = activitiesSchema.safeParse(req.body.activities);
        if (!parseResult.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: parseResult.error.errors,
            });
        }
        const activities = parseResult.data;
        const results = [];
        for (const act of activities) {
            const activity = yield database_1.default.activity.upsert({
                where: { locationKey: act.locationKey },
                update: {
                    data: act.data,
                    timestamp: act.timestamp ? new Date(act.timestamp) : new Date(),
                    updatedAt: new Date(),
                },
                create: {
                    locationKey: act.locationKey,
                    data: act.data,
                    timestamp: act.timestamp ? new Date(act.timestamp) : new Date(),
                },
            });
            results.push(activity);
        }
        return res.status(200).json({ message: "Activities cached", activities: results });
    }
    catch (error) {
        console.error("Error in cacheActivitiesController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = cacheActivitiesController;
