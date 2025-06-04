import { Request, Response } from "express";
import db from "../db/database";

const removeFavouritesController = async (req: Request, res: Response) => {
    try {
        const { listId, activityId } = req.body;

        if (!listId || !activityId) {
            return res.status(400).json({ error: "listId and activityId are required" });
        }

        const favourite = await db.favourite.findFirst({
            where: { listId, activityId }
        });

        if (!favourite) {
            return res.status(404).json({ error: "Favourite not found" });
        }

        await db.favourite.delete({
            where: { id: favourite.id }
        });

        return res.status(200).json({ message: "Favourite removed successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Failed to remove favourite" });
    }
};

export default removeFavouritesController;