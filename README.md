# ExploreZA

A small backend utility to cache and enrich trail/location data from OpenStreetMap (Overpass) and Google Places. The core function saves Overpass elements to the local database and intelligently merges Google Places data when important fields are missing.

## Key file
- src/saveOverpassElement.ts — saves and enriches Overpass elements (uses axios and db from ../db/database).

## Prerequisites
- Node.js (16+ recommended)
- npm or yarn
- A configured database (see your project's db setup)
- Google Maps API key with Places API access (optional, used for enrichment)

## Environment
Create a .env with at least:
- GOOGLE_MAPS_API_KEY=your_api_key_here
- DATABASE_URL=your_database_connection_string

## Setup
1. Install dependencies:
   - npm install
2. Configure your database and run migrations (if using Prisma or similar):
   - npx prisma migrate deploy (or your project's migration command)
3. Add environment variables to .env.

## Usage
- The main helper is saveOverpassElement(element, source).
  - element: Overpass element object (must include type, id, tags, geometry).
  - source: "osm" | "google"
- The function:
  - Looks up an existing record by locationKey (`${type}-${id}`).
  - Deep-merges existing data with incoming element data.
  - If key fields are missing (name, city, imageUrl, rating, formatted_address), it queries Google Places near the element coordinates and fills missing fields.
  - Upserts the merged record into the activity table/collection.

## Notes & Troubleshooting
- Ensure GOOGLE_MAPS_API_KEY has the Places API enabled and billing set up if required.
- The enrichment radius is small (default 100m). Adjust the radius in the function if needed.
- Check logs for Google Places failures — the function captures and logs errors but continues to save the element.
- If you change the database schema, re-run migrations and verify the db import path (../db/database).

## Contributing
- Keep changes focused and test locally with representative Overpass elements.
- Use logging to verify merge behavior and Google Places enrichment.

## License
- Project license as defined in the repository (add LICENSE file if missing).
