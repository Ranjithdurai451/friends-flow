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
  email: z.string().email(),
  password: z.string().min(8).max(20),
});
export const SignUpSchema: ZodType<newUser> = z
  .object({
    name: z.string().min(5).max(15),
    username: z.string().min(5).max(20),
    email: z.string().email(),
    password: z.string().min(8).max(20),
    confirmpassword: z.string().min(8).max(20),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: 'password do not match',
    path: ['confirmpassword'],
  });
export const ConfirmPassowordSchema: ZodType<ConfirmPasswordType> = z
  .object({
    newPassword: z.string().min(8),
    RepeatednewPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.RepeatednewPassword, {
    message: 'Passwords do not match',
    path: ['RepeatednewPassword'],
  });
export const NewPostSchema: ZodType<NewPostType> = z.object({
  caption: z.string().min(2),
  location: z.string().min(2),
  tags: z.string().min(1).max(30),
});

export const UpdatePostSchema: ZodType<NewPostType> = z.object({
  caption: z.string().min(2).max(30),
  location: z.string().min(2),
  tags: z.string().min(1).max(30),
});

export const UpdateUserSchema: ZodType<updateUserType> = z.object({
  name: z.string().min(5).max(15),
  username: z.string().min(5).max(20),
  bio: z.string().min(1).max(30),
});

export const updateEmailSchema: ZodType<updateEmailType> = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});
