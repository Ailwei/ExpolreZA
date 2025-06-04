/// <reference path="../express.d.ts" />;
import { Request, Response } from "express";
import db from "../db/database";

const fetchFavouritesController = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
      
        const lists = await db.list.findMany({
            where: { userId },
            select: { id: true }
        });
        const listIds = lists.map(list => list.id);

        const favourites = await db.favourite.findMany({
            where: { listId: { in: listIds } },
            include: { activity: true }
        });

        res.status(200).json({ favourites });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default fetchFavouritesController;