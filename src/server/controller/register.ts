import { Request, Response } from 'express';
import db from '../db/database';
import bcrypt from 'bcrypt';
import { registerSchema } from '../schemas/registerSchema';

const registerController = async (
    req: Request,
    res: Response
) => {
    try {
        const parseResult = registerSchema.safeParse(req.body);
        if (!parseResult.success) {
    return res.status(400).json({
        message: "Validation failed",
        errors: parseResult.error.errors.map(e => ({
            field: e.path[0],
            message: e.message
        }))
    });
}
        const { email, password, firstName, lastName } = parseResult.data;

        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName
            }
        });

        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error in registerController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default registerController;