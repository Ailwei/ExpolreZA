import { Request, Response } from "express";
import db from "../db/database";

const deleteListController = async (req: Request, res: Response) => {
    try {
        const { listId, userId } = req.body;

        if (!listId || !userId) {
            return res.status(400).json({ error: "listId and userId are required" });
        }

        const list = await db.list.findFirst({
            where: { id: listId, userId: userId },
            include: { favourites: true }
        });

        if (!list) {
            return res.status(404).json({ error: "List not found" });
        }

        if (list.favourites && list.favourites.length > 0) {
            await db.favourite.deleteMany({
                where: { listId: listId }
            });
        }
        await db.list.delete({
            where: { id: listId }
        });

        return res.status(200).json({ message: "List and its favourites deleted successfully" });
    } catch (error) {
        console.error("Error deleting list:", error);
        return res.status(500).json({ error: "Failed to delete list" });
    }
};

export default deleteListController;