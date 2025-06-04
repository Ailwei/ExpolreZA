"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .superRefine((val, ctx) => {
        if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: "Invalid email"
            });
        }
    }),
    password: zod_1.z.string({ required_error: "Password is required" })
        .min(8, "Password is required")
        .refine(val => val === undefined ||
        val.length === 0 ||
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(val), {
        message: "Password must include at least one uppercase letter, one number, and one special character.",
        path: ["password"],
    }),
    firstName: zod_1.z.string({ required_error: "First name is required" })
        .min(1, "First name is required"),
    lastName: zod_1.z.string({ required_error: "Last name is required" })
        .min(1, "Last name is required"),
});
