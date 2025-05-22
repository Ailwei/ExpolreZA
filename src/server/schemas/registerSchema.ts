import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .superRefine((val, ctx) => {
            if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Invalid email"
                });
            }
        }),
    password: z.string({ required_error: "Password is required" })
        .min(8, "Password is required")
        .refine(
            val =>
                val === undefined ||
                val.length === 0 ||
                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(val),
            {
                message: "Password must include at least one uppercase letter, one number, and one special character.",
                path: ["password"],
            }
        ),
    firstName: z.string({ required_error: "First name is required" })
        .min(1, "First name is required"),
    lastName: z.string({ required_error: "Last name is required" })
        .min(1, "Last name is required"),
});
export type RegisterSchema = z.infer<typeof registerSchema>;