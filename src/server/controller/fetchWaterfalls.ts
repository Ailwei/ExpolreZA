import { Request, Response } from "express";
import db from "../db/database";
import { fetchNearbySchema } from "../schemas/fetchNearbySchema";

const fetchNearbyWaterfallsController = async (req: Request, res: Response) => {
  try {
    const parseResult = fetchNearbySchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parseResult.error.errors.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
      });
    }

    const { latitude, longitude, radius = 60000 } = req.body;

    const nearbyActivities = await db.$queryRaw<
      { id: string; data: any; distance: number }[]
    >`
      SELECT *,
      (
        6371000 * acos(
          cos(radians(${latitude})) *
          cos(radians(CAST(data->>'lat' AS double precision))) *
          cos(radians(CAST(data->>'lon' AS double precision)) - radians(${longitude})) +
          sin(radians(${latitude})) *
          sin(radians(CAST(data->>'lat' AS double precision)))
        )
      ) AS distance
      FROM "Activity"
      WHERE (
        6371000 * acos(
          cos(radians(${latitude})) *
          cos(radians(CAST(data->>'lat' AS double precision))) *
          cos(radians(CAST(data->>'lon' AS double precision)) - radians(${longitude})) +
          sin(radians(${latitude})) *
          sin(radians(CAST(data->>'lat' AS double precision)))
        )
      ) <= ${radius}
      ORDER BY distance ASC;
    `;

    const waterfallSpots = nearbyActivities.filter((act) => {
      const tags = act.data?.tags || {};
      const category = act.data?.category || "";

      return (
        tags.waterway === "waterfall" ||
        tags.natural === "waterfall" ||
        category === "waterfall" ||
        category === "waterfalls"
      );
    });

    res.status(200).json({
      count: waterfallSpots.length,
      activities: waterfallSpots,
      message:
        waterfallSpots.length === 0
          ? "No waterfalls found nearby."
          : `Found ${waterfallSpots.length} waterfalls nearby.`,
    });
  } catch (error) {
    console.error("Error fetching nearby waterfalls:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default fetchNearbyWaterfallsController;
