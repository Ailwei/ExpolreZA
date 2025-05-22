import { z } from "zod";

export const saveFavouriteSchema = z.object({
  listId: z.string().uuid({ message: "Invalid list ID" }),
  activityId: z.string().uuid({ message: "Invalid activity ID" }),
});

export type SaveFavouriteSchema = z.infer<typeof saveFavouriteSchema>;