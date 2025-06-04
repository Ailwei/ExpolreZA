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
const database_1 = __importDefault(require("./db/database"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
function seedActivities() {
    return __awaiter(this, void 0, void 0, function* () {
        // Adjust the path if your file is elsewhere
        const filePath = path_1.default.join(__dirname, "data/generated_Activities.json");
        const file = yield promises_1.default.readFile(filePath, 'utf-8');
        const { activities } = JSON.parse(file);
        for (const act of activities) {
            yield database_1.default.activity.upsert({
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
        }
        console.log('Seeding complete!');
        yield database_1.default.$disconnect();
    });
}
seedActivities().catch(e => {
    console.error(e);
    database_1.default.$disconnect();
});
