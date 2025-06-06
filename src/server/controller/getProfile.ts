import { Request, Response } from 'express';
import db from '../db/database';

const getProfileController = async (req: Request, res: Response) => {
    const userId = req.user.id;
    try {
        const user = await db.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                profilePic: true,
                followers: {
                    select: {
                        follower: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                profilePic: true
                            }
                        }
                    }
                },
                following: {
                    select: {
                        following: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                profilePic: true
                            }
                        }
                    }
                }
            }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
export default getProfileController;