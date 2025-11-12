import axios from "axios";

/**
 * Build Overpass query using a circular radius around a specific point
 */
function buildOverpassQuery(latitude: number, longitude: number, radiusMeters = 60000) {
  return `
   [out:json][timeout:120];
(
  // Hiking spots
  nwr["route"="hiking"](around:${radiusMeters},${latitude},${longitude});
  // Other outdoor activities
  node["leisure"="fishing"](around:${radiusMeters},${latitude},${longitude});
  way["leisure"="fishing"](around:${radiusMeters},${latitude},${longitude});
  node["tourism"="camp_site"](around:${radiusMeters},${latitude},${longitude});
  way["tourism"="camp_site"](around:${radiusMeters},${latitude},${longitude});
  node["mountain_pass"="yes"](around:${radiusMeters},${latitude},${longitude});
  way["mountain_pass"="yes"](around:${radiusMeters},${latitude},${longitude});
);
out center;

  `;
}

/**
 * Categorize OSM elements for frontend
 */
function getCategory(tags: Record<string, string> = {}) {
  if (tags.route === "hiking" ) return "hiking";
  if (tags.leisure === "fishing") return "fishing";
  if (tags.tourism === "camp_site") return "camping";
  if (tags.mountain_pass === "yes") return "mountain_pass";
  return "other";
}

/**
 * Fetch nearby outdoor activities using radius-based Overpass query
 */
export async function fetchActivitiesFromOverpass(latitude: number, longitude: number, radiusMeters = 60000) {
  const query = buildOverpassQuery(latitude, longitude, radiusMeters);

  try {
    const { data } = await axios.post(
      "https://overpass-api.de/api/interpreter",
      query,
      {
        headers: { "Content-Type": "text/plain" },
        timeout: 30000,
      }
    );

   const results = data.elements
  .filter((el: any) => el.tags?.name)
  .map((el: any) => ({
    id: el.id,
    type: el.type,
    name: el.tags.name,
    lat: el.lat || el.center?.lat,
    lon: el.lon || el.center?.lon,
    tags: el.tags,
    category: getCategory(el.tags),
  }));

    console.log(`Found ${results.length} activities within ${radiusMeters / 1000}km`);
    return results;
  } catch (err: any) {
    console.error("Overpass fetch error:", err.message);
    return [];
  }
}
