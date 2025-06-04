import { Request, Response } from "express";
import db from "../db/database";

const fetchListsController = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const lists = await db.list.findMany({
            where: { userId }
        });
        res.status(200).json({ lists });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default fetchListsController;