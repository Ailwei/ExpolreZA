import db from "../db/database";
import { Request, Response } from "express";
import { saveFavouriteSchema } from "../schemas/saveFavouriteSchema.tsx";

const saveFavoritesController = async (req: Request, res: Response) => {
    try {
        const parseResul = saveFavouriteSchema.safeParse(req.body);
        if (!parseResul.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: parseResul.error.errors.map(e => ({
                    field: e.path[0],
                    message: e.message
                }))
            });
        }
        const userId = req.user.id; 
        const { listId, activityId } = parseResul.data;

        const list = await db.list.findUnique({ where: { id: listId } });
        if (!list || list.userId !== userId) {
            return res.status(403).json({ message: "Not authorized to add to this list" });
        }

        
        const favourite = await db.favourite.create({
            data: {
                listId,
                activityId,
            }
            
        });
        console.log("Favourite saved:", favourite);
        console.log("User ID:", userId);
        console.log("List ID:", listId);
        console.log("Activity ID:", activityId);

        return res.status(201).json({ message: "Favourite saved", favourite });
    } catch (error) {
        console.error("Error in saveFavoritesController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default saveFavoritesController;