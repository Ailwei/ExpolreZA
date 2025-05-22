import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .refine(
      val => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      { message: "Invalid email" }
    ),
  password: z.string({ required_error: "Password is required" })
    .min(1,"Password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;