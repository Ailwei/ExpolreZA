import { Request, Response } from 'express';
import db from '../db/database';

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

const uploadProfilePicController = async (req: MulterRequest, res: Response) => {
    const userId = req.user.id;
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    try {
        const updateProfilePicture = await db.user.update({
            where: { id: userId },
            data: { profilePic: req.file.filename },
            select: {
                id: true,
                profilePic: true,
                
            }
        });
        return res.status(200).json({ message: 'Profile picture updated', user: updateProfilePicture });
    } catch (error) {
        console.error('Error updating profile picture:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default uploadProfilePicController;