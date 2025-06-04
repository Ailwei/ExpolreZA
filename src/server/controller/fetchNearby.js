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
const fetchNearbySchema_1 = require("../schemas/fetchNearbySchema");
const fetchNearbyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parseResult = fetchNearbySchema_1.fetchNearbySchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: parseResult.error.errors.map(e => ({
                    field: e.path[0],
                    message: e.message
                }))
            });
        }
        const { latitude, longitude, type } = req.body;
        const where = {
            AND: [
                {
                    data: {
                        path: ["geometry", "location", "lat"],
                        gte: latitude - 0.1,
                        lte: latitude + 0.1,
                    }
                },
                {
                    data: {
                        path: ["geometry", "location", "lng"],
                        gte: longitude - 0.1,
                        lte: longitude + 0.1,
                    }
                }
            ]
        };
        if (type) {
            where.AND.push({
                data: {
                    path: ["types"],
                    array_contains: type
                }
            });
        }
        const activities = yield database_1.default.activity.findMany({ where });
        if (activities.length === 0) {
            return res.status(200).json({ message: "No activities found nearby.", activities: [] });
        }
        res.status(200).json({ activities });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = fetchNearbyController;
