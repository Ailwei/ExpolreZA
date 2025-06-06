import { Request, Response } from "express";
import db from "../db/database";
import bcrypt from "bcrypt";
import { loginSchema } from "../schemas/loginSchema";
import Jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET as string;

const loginController = async (req: Request, res: Response) => {
    try {
        if (!JWT_SECRET) {
            return res.status(500).json({ message: "JWT secret is not configured" });
        }
        const parseResult = loginSchema.safeParse(req.body);
        if (!parseResult.success) {
  return res.status(400).json({
    message: "Validation failed",
    errors: parseResult.error.errors.map(e => ({
      field: e.path[0],
      message: e.message
    }))
  });
}
        const { email, password } = parseResult.data;

        const user = await db.user.findUnique(
            {
                where: {
                    email

                }
            }
        );
        if (!user || !user.password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = Jwt.sign(
            { id: user.id, email: user.email }, JWT_SECRET,
            { expiresIn: "1h" }
        );
        console.log("JWT token for user:", token)
        return res.status(200).json({ message: "Login successful", token, user: { email: user.email, firstName: user.firstName, lastName: user.lastName } });

    } catch (error) {
        console.error("Error in loginController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export default loginController;