import { Request, Response } from "express";
import db from "../db/database";
import { Prisma } from "@prisma/client";

/**
 * Save a completed activity for a user
 * POST /completed
 * Body: { userId: string, activityId: string }
 */
export const saveCompletedController = async (req: Request, res: Response) => {
  try {
    const { userId, activityId } = req.body as { userId?: string; activityId?: string };

    if (!userId || !activityId) {
      return res.status(400).json({
        status: "error",
        message: "Both 'userId' and 'activityId' are required",
      });
    }

    const activity = await db.activity.findUnique({ where: { id: activityId } });
    if (!activity) {
      return res.status(404).json({
        status: "error",
        message: "Activity not found",
      });
    }

    const existing = await db.completedActivity.findFirst({
      where: { userId, activityId },
    });

    if (existing) {
      return res.status(409).json({
        status: "error",
        message: "Activity already marked as completed",
      });
    }

    const completed = await db.completedActivity.create({
      data: { userId, activityId },
    });

    return res.status(201).json({
      status: "success",
      message: "Activity marked as completed",
      data: completed,
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error:", err.code, err.message);
      return res.status(500).json({
        status: "error",
        message: "Database error",
        details: err.message,
      });
    }

    console.error("Server error:", err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
