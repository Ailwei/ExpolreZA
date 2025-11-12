import { Request, Response } from "express";
import { fetchActivitiesFromOverpass } from "../sutils/fecthOverpass";
import { saveOverpassElement } from "../sutils/saveData";

/**
 * Controller to fetch activities from Overpass API and save them in the DB
 */
export default async function fetchDataController(req: Request, res: Response) {
  const { latitude, longitude, radius } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "latitude and longitude required" });
  }

  try {
    const elements = await fetchActivitiesFromOverpass(
      Number(latitude),
      Number(longitude),
      radius ? Number(radius) : 60000
    );

    if (elements.length === 0) {
      return res.json({ elements: [], message: "No activities found" });
    }

    const chunkSize = 100;

    for (let i = 0; i < elements.length; i += chunkSize) {
      const chunk = elements.slice(i, i + chunkSize);
      await Promise.all(chunk.map((el: any) => saveOverpassElement(el, "osm")));
    }

    res.json({ elements, message: `${elements.length} activities fetched and saved.` });
  } catch (err: any) {
    console.error("Error fetching or saving activities:", err);
    res.status(500).json({ error: "Failed to fetch or save data", details: err.message });
  }
}
