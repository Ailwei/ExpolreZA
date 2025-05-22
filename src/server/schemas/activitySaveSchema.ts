import { z } from "zod";

export const activitySaveSchema = z.object({
  locationKey: z.string().min(1, "Location key is required"),
  data: z.object({
    locationName: z.string().min(1, "Location name is required"),
    place_id: z.string().optional(),
    types: z.array(z.string()).optional(),
    geometry: z.object({
      location: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    }).optional(),
    formatted_address: z.string().optional(),
    rating: z.number().optional(),
    user_ratings_total: z.number().optional(),
    photos: z.array(
      z.object({
        photo_reference: z.string(),
        height: z.number(),
        width: z.number(),
      })
    ).optional(),
  }),
  timestamp: z.string().optional(),
});

export type ActivitySaveSchema = z.infer<typeof activitySaveSchema>;