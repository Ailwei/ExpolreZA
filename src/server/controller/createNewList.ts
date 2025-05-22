import db from "../db/database";
import { Request, Response } from "express";
import {createListSchema, CreateListSchema } from "../schemas/createListSchema";


const createNewListController = async (req: Request, res: Response) => {
    try {
        console.log("Received from frontend:", req.body);

        const parseResult = createListSchema.safeParse(req.body);
        if (!parseResult.success){
            return res.status(400).json({
                message: "Validation failed",
                errors: parseResult.error.errors.map(e => ({
                    field: e.path[0],
                    message: e.message
                }))
            })
        }
        const userId = req.body.userId;
        if (!userId){
            return res.status(401).json({ message: "User Id is required" });
        }
        const { listName, description , privateLevel} = parseResult.data;
        const addList = await db.list.create({
            data: {
                listName,
                description,
                userId,
                privateLevel
            }
        });
        console.log("List created successfully:", addList);
        return res.status(201).json(addList);
        
    }
     catch(error){
        console.error("Error in createNewList:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export default createNewListController;