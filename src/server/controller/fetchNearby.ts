import { Request, Response } from "express";
import db from "../db/database";
import { fetchNearbySchema } from "../schemas/fetchNearbySchema";

/**
 * Helper: approximate distance between two points in meters using Haversine formula
 */
function getDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const fetchNearbyController = async (req: Request, res: Response) => {
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

    const { latitude, longitude, radius = 10000, types } = req.body;

    let activities = await db.activity.findMany({
      where:
        types && Array.isArray(types) && types.length > 0
          ? {
            data: {
              path: ["tags", "type"],
              array_contains: types,
            },
          }
          : undefined,
    });

    const filtered = activities.filter((act) => {
      const d = act.data;
      if (!d || typeof d !== "object" || Array.isArray(d)) return false;

      let points: { lat: number; lon: number }[] = [];

      if ("geometry" in d && Array.isArray(d.geometry)) {
        points = d.geometry
          .map((pt: any) => {
            if (pt.lat != null && pt.lon != null) return { lat: pt.lat, lon: pt.lon };
            return null;
          })
          .filter((pt: any): pt is { lat: number; lon: number } => pt !== null); 
      } else if ("lat" in d && "lon" in d && typeof d.lat === "number" && typeof d.lon === "number") {
        points = [{ lat: d.lat, lon: d.lon }];
      }

      return points.some((pt) => getDistanceMeters(latitude, longitude, pt.lat, pt.lon) <= radius);
    });

    res.status(200).json({
      activities: filtered,
      message: filtered.length === 0 ? "No activities found nearby." : undefined,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default fetchNearbyController;
