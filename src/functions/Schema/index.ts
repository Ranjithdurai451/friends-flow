import { ZodType, z } from 'zod';
import {
  ConfirmPasswordType,
  NewPostType,
  login,
  newUser,
  updateEmailType,
  updateUserType,
} from '../types/types';

export const LoginSchema: ZodType<login> = z.object({
  email: z.string().email("Invalid email address format."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(20, "Password cannot exceed 20 characters."),
});

export const SignUpSchema: ZodType<newUser> = z
  .object({
    name: z
      .string()
      .min(5, "Name must be at least 5 characters long.")
      .max(15, "Name cannot exceed 15 characters."),
    username: z
      .string()
      .min(5, "Username must be at least 5 characters long.")
      .max(20, "Username cannot exceed 20 characters."),
    email: z.string().email("Invalid email address format."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(20, "Password cannot exceed 20 characters."),
    confirmpassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters long.")
      .max(20, "Confirm password cannot exceed 20 characters."),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match.",
    path: ['confirmpassword'],
  });

export const ConfirmPassowordSchema: ZodType<ConfirmPasswordType> = z
  .object({
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long."),
    RepeatednewPassword: z
      .string()
      .min(8, "Repeated password must be at least 8 characters long."),
  })
  .refine((data) => data.newPassword === data.RepeatednewPassword, {
    message: "Passwords do not match.",
    path: ['RepeatednewPassword'],
  });

export const NewPostSchema: ZodType<NewPostType> = z.object({
  caption: z
    .string()
    .min(2, "Caption must be at least 2 characters long."),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters long."),
  tags: z
    .string()
    .min(1, "At least one tag is required.")
    .max(30, "Tags cannot exceed 30 characters."),
});

export const UpdatePostSchema: ZodType<NewPostType> = z.object({
  caption: z
    .string()
    .min(2, "Caption must be at least 2 characters long.")
    .max(30, "Caption cannot exceed 30 characters."),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters long."),
  tags: z
    .string()
    .min(1, "At least one tag is required.")
    .max(30, "Tags cannot exceed 30 characters."),
});

export const UpdateUserSchema: ZodType<updateUserType> = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters long.")
    .max(15, "Name cannot exceed 15 characters."),
  username: z
    .string()
    .min(5, "Username must be at least 5 characters long.")
    .max(20, "Username cannot exceed 20 characters."),
  bio: z
    .string()
    .min(1, "Bio must be at least 1 character long.")
    .max(30, "Bio cannot exceed 30 characters."),
});

export const updateEmailSchema: ZodType<updateEmailType> = z.object({
  email: z.string().email("Invalid email address format."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(20, "Password cannot exceed 20 characters."),
});
