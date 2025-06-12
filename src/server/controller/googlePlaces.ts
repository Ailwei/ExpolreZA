import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export async function fetchGooglePlaceByCoords(lat: number, lng: number) {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=50&type=park|tourist_attraction|point_of_interest&key=${GOOGLE_API_KEY}`;
  const response = await axios.get(url);
  if (response.data.results && response.data.results.length > 0) {
    const place = response.data.results[0];
    console.log("Google Place found:", place);
    return {
      name: place.name,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total,
      place_id: place.place_id,
      photoRef: place.photos && place.photos[0]?.photo_reference,
      formatted_address: place.vicinity,
    };
  }
  return null;
}

export function getGooglePhotoUrl(photoRef: string, maxwidth = 400) {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photoreference=${photoRef}&key=${GOOGLE_API_KEY}`;
}