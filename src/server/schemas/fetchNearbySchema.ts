import { z } from "zod";

export const fetchNearbySchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  type: z.string().optional(),
});
export type FetchNearbySchema = z.infer<typeof fetchNearbySchema>;