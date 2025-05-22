import { Request, Response } from "express";
import db from "../db/database";
import { FetchNearbySchema, fetchNearbySchema } from "../schemas/fetchNearbySchema";

const fetchNearbyController = async (req: Request, res: Response) => {
  try {
    const parseResult = fetchNearbySchema.safeParse(req.body);
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

const where: any = {
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

const activities = await db.activity.findMany({ where });

if (activities.length === 0) {
  return res.status(200).json({ message: "No activities found nearby.", activities: [] });
}

res.status(200).json({ activities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default fetchNearbyController;