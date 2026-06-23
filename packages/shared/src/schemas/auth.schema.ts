import { z } from 'zod';

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, 'First name is required')
      .max(20, 'First name cannot exceed 20 characters'),

    lastName: z
      .string()
      .trim()
      .max(20, 'Last name cannot exceed 20 characters')
      .transform((lastName) => lastName || undefined)
      .optional(),

    email: z
      .string()
      .trim()
      .max(255)
      .email('Invalid email')
      .transform((email) => email.toLowerCase()),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain uppercase letter')
      .regex(/[a-z]/, 'Must contain lowercase letter')
      .regex(/[0-9]/, 'Must contain number'),

    passwordConfirm: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  });

export const signinSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Invalid email')
    .transform((email) => email.toLowerCase()),

  password: z.string().min(1, 'Password is required'),
});

export type SignupInput = z.input<typeof signupSchema>;
export type SignupData = z.output<typeof signupSchema>;
export type SigninInput = z.input<typeof signinSchema>;
export type SigninData = z.output<typeof signinSchema>;

export const signup = signupSchema;
export const signin = signinSchema;
