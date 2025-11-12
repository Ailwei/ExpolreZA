import db from "../db/database";

/**
 * Save an Overpass element to the database, merging with existing data if it exists
 * @param element OSM element
 * @param source "osm"
 */
export async function saveOverpassElement(element: any, source: "osm") {
  const elementType = element.type || "unknown";
  const elementId = element.id || `missing-${Date.now()}`;
  const locationKey = `${elementType}-${elementId}`;
  const timestamp = new Date();

  const tags = element.tags || {};
  const name = tags.name || element.name || "Unnamed";

  let lat: number | null = null;
  let lon: number | null = null;

  if (element.lat && element.lon) {
    lat = element.lat;
    lon = element.lon;
  } else if (Array.isArray(element.geometry) && element.geometry.length > 0) {
    const sumLat = element.geometry.reduce((sum: number, p: any) => sum + p.lat, 0);
    const sumLon = element.geometry.reduce((sum: number, p: any) => sum + p.lon, 0);
    lat = sumLat / element.geometry.length;
    lon = sumLon / element.geometry.length;
  } else if (element.center?.lat && element.center?.lon) {
    lat = element.center.lat;
    lon = element.center.lon;
  }

  if (lat == null || lon == null) {
    console.warn(` Skipping ${locationKey} — missing coordinates`);
    return;
  }

  const existingRecord = await db.activity.findUnique({ where: { locationKey } });
  const existingData = (existingRecord?.data && typeof existingRecord.data === "object" && !Array.isArray(existingRecord.data))
    ? (existingRecord.data as Record<string, any>)
    : {};

  const existingTags = (existingData.tags && typeof existingData.tags === "object" && !Array.isArray(existingData.tags))
    ? existingData.tags as Record<string, any>
    : {};

  const mergedData = {
    ...existingData,
    ...element,
    source,
    tags: {
      ...existingTags,
      ...tags,
    },
    lat,
    lon,
  };

  await db.activity.upsert({
    where: { locationKey },
    update: { data: mergedData, timestamp },
    create: {
      locationKey,
      data: mergedData,
      timestamp,
    },
  });

  console.log(` Saved: ${locationKey}`);
  console.log(`   Name: ${name}`);
  console.log(`   Coordinates: lat=${lat}, lon=${lon}`);
  console.log(`   Source: ${source}`);
  console.log("--------------------------------------------------");
}
