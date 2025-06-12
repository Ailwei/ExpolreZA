import axios from "axios";
import { saveOverpassElement } from "./saveData";
import { fetchGooglePlaceByCoords, getGooglePhotoUrl } from "./googlePlaces";

/**
 * @param latitude number
 * @param longitude number
 * @param radiusMeters number
 * @returns Promise<any[]> Array of OSM ways with geometry
 */

export async function fetchTrailsFromOSM(latitude: number, longitude: number, radiusMeters = 10000) {
  const query = `
    [out:json];
    (
      way(around:${radiusMeters},${latitude},${longitude})["highway"="path"];
      way(around:${radiusMeters},${latitude},${longitude})["highway"="footway"];
      way(around:${radiusMeters},${latitude},${longitude})["natural"="waterfall"];
      way(around:${radiusMeters},${latitude},${longitude})["tourism"="camp_site"];
      node(around:${radiusMeters},${latitude},${longitude})["mountain_pass"="yes"];
      way(around:${radiusMeters},${latitude},${longitude})["leisure"="fishing"];
      node(around:${radiusMeters},${latitude},${longitude})["leisure"="fishing"];
      way(around:${radiusMeters},${latitude},${longitude})["natural"="water"];
      way(around:${radiusMeters},${latitude},${longitude})["waterway"="river"];
      way(around:${radiusMeters},${latitude},${longitude})["waterway"="stream"];
      way(around:${radiusMeters},${latitude},${longitude})["waterway"="riverbank"];
    );
    out geom;
  `;

  const response = await axios.post(
    "https://overpass-api.de/api/interpreter",
    query,
    { headers: { "Content-Type": "text/plain" } }
  );

  const results = [];

  for (const element of response.data.elements) {
    let name = element.tags?.name;
    let imageUrl = element.tags?.image;
    let rating = element.tags?.rating;
    let user_ratings_total = element.tags?.user_ratings_total;
    let formatted_address = element.tags?.address;

    const point = Array.isArray(element.geometry) && element.geometry.length > 0
      ? element.geometry[0]
      : null;

    let googleData: any = null;
    if (
      point &&
      (
        !name ||
        !imageUrl ||
        !rating ||
        !user_ratings_total ||
        !formatted_address
      )
    ) {
      googleData = await fetchGooglePlaceByCoords(point.lat, point.lon);
    }

    if (googleData) {
      if (!name && googleData.name) name = googleData.name;
      if (!imageUrl && googleData.photoRef) imageUrl = getGooglePhotoUrl(googleData.photoRef);
      if (!rating && googleData.rating) rating = googleData.rating;
      if (!user_ratings_total && googleData.user_ratings_total) user_ratings_total = googleData.user_ratings_total;
      if (!formatted_address && googleData.formatted_address) formatted_address = googleData.formatted_address;
    }

    await saveOverpassElement({
      ...element,
      tags: {
        ...element.tags,
        name,
        imageUrl,
        rating,
        user_ratings_total,
        formatted_address,
      }
    });

    results.push({
      id: element.id,
      type: element.type,
      tags: {
        ...element.tags,
        name,
        imageUrl,
        rating,
        user_ratings_total,
        formatted_address,
      },
      geometry: element.geometry,
      data: {
        name: name || "Unnamed Trail",
        imageUrl: imageUrl || null,
        rating: rating || null,
        user_ratings_total: user_ratings_total || null,
        formatted_address: formatted_address || null,
        lat: Array.isArray(element.geometry) && element.geometry.length > 0 ? element.geometry[0].lat : null,
        lon: Array.isArray(element.geometry) && element.geometry.length > 0 ? element.geometry[0].lon : null,
      }
    });
  }

  return results;
}