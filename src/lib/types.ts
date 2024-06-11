import { z } from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@$%+\-()*./:;<=>?~]).{6,50}$/;

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Email is required" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" }),
});

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(15, { message: "Username must be at most 15 characters long" }),
  email: z
    .string()
    .trim()
    .email({ message: "Email is required" }),
  password: z
    .string()
    .trim()
    .regex(passwordRegex, { message: "Password must be 6-50 characters long, contain at least one uppercase letter, and one special character" }),
  confirmPassword: z
    .string()
    .trim()
}).refine((data) => data.confirmPassword === data.password, { message: "Passwords don't match", path: ["confirmPassword"] })


export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Email is required" }),
});

export type TSignInSchema = z.infer<typeof signInSchema>;
export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
