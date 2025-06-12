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
    const { latitude, longitude, types } = req.body;

    // Fetch all activities (or filter by types if provided)
    let activities = await db.activity.findMany({
      where: types && Array.isArray(types) && types.length > 0
        ? {
            data: {
              path: ["types"],
              array_contains: types
            }
          }
        : undefined
    });

    // Filter for nearby activities (works for both Google and OSM data)
    const filtered = activities.filter(act => {
      const d = act.data;
      if (!d || typeof d !== "object" || Array.isArray(d)) return false;

      // Google Places-style
      if (
        "geometry" in d &&
        d.geometry &&
        typeof d.geometry === "object" &&
        "location" in d.geometry &&
        d.geometry.location &&
        typeof d.geometry.location === "object" &&
        d.geometry.location !== null &&
        "lat" in d.geometry.location &&
        "lng" in d.geometry.location &&
        typeof (d.geometry.location as any).lat === "number" &&
        typeof (d.geometry.location as any).lng === "number"
      ) {
        const loc = d.geometry.location as { lat: number; lng: number };
        return (
          loc.lat >= latitude - 0.1 &&
          loc.lat <= latitude + 0.1 &&
          loc.lng >= longitude - 0.1 &&
          loc.lng <= longitude + 0.1
        );
      }
      // OSM "way" (geometry array)
      if ("geometry" in d && Array.isArray(d.geometry)) {
        return d.geometry.some(
          (pt: any) =>
            pt.lat >= latitude - 0.1 &&
            pt.lat <= latitude + 0.1 &&
            pt.lon >= longitude - 0.1 &&
            pt.lon <= longitude + 0.1
        );
      }
      // OSM "node"
      if ("lat" in d && "lon" in d && typeof d.lat === "number" && typeof d.lon === "number") {
        return (
          d.lat >= latitude - 0.1 &&
          d.lat <= latitude + 0.1 &&
          d.lon >= longitude - 0.1 &&
          d.lon <= longitude + 0.1
        );
      }
      return false;
    });

    if (filtered.length === 0) {
      return res.status(200).json({ message: "No activities found nearby.", activities: [] });
    }

    res.status(200).json({ activities: filtered });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default fetchNearbyController;