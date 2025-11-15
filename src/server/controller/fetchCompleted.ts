import { Request, Response } from "express";
import db from "../db/database";

/**
 * Fetch full completed activities for a user
 * POST /fetchcompleted
 * Body: { userId: string }
 */
export const fetchCompletedController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        status: "error",
        message: "'userId' is required",
      });
    }

    console.log("Fetching completed for userId:", userId);

    const completed = await db.completedActivity.findMany({
      where: { userId },
      include: {
        activity: true,
      },
    });

    console.log("Completed records:", completed);

    const activities = completed.map((c) => c.activity);

    return res.status(200).json({
      status: "success",
      message: "Completed activities fetched successfully",
      data: activities,
    });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
