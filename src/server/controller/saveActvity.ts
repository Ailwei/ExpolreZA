import { Request, Response } from "express";
import db from "../db/database";
import { z } from "zod";
import { activitySaveSchema } from "../schemas/activitySaveSchema";


const activitiesSchema = z.array(activitySaveSchema);

const cacheActivitiesController = async (req: Request, res: Response) => {
  try {
   
    const parseResult = activitiesSchema.safeParse(req.body.activities);
    if (!parseResult.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parseResult.error.errors,
      });
    }

    const activities = parseResult.data;
    const results: any[] = [];

    for (const act of activities) {
      const activity = await db.activity.upsert({
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
  } catch (error) {
    console.error("Error in cacheActivitiesController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default cacheActivitiesController;