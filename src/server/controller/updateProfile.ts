import { Request, Response } from 'express';
import db from '../db/database';

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

const updateProfileController = async (req: MulterRequest, res: Response) => {
    const userId = req.user.id;
    const { firstName, lastName, email } = req.body;
    let profilePicPath = req.body.profilePic;

    if (req.file) {
        profilePicPath = req.file.filename;
    }

    if (req.file) {
        profilePicPath = req.file.filename;
    }

    try {
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: {
                firstName,
                lastName,
                email,
                profilePic: profilePicPath,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                profilePic: true,
                email: true,
                createdAt: true,
            }
        });
        return res.status(200).json({ message: "Profile updated", user: updatedUser });
    } catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
export default updateProfileController;