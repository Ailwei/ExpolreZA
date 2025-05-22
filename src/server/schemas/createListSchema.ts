import z from 'zod';

export const createListSchema = z.object({
    listName: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    privateLevel: z.enum(["Public", "Private", "FollowersOnly"], {
        errorMap: () => ({ message: "Privacy level is required" }),
    }),

    
})
export type CreateListSchema = z.infer<typeof createListSchema>;