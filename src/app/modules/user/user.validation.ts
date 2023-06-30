import z from "zod";
import { userRole } from "./user.constant";
const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),
    role: z.enum([...userRole] as [string, ...string[]], {
      required_error: "Role is required",
    }),
    phoneNumber: z.string({
      required_error: "PhoneNumber is required",
    }),
    name: z.object({
      firstName: z.string({
        required_error: "FirstName is required",
      }),
      lastName: z.string({
        required_error: "LastName is required",
      }),
    }),
    address: z.string({
      required_error: "Address is required",
    }),
    income: z.number({
      required_error: "Income is required",
    }),
    budget: z.number({
      required_error: "Budget is required",
    }),
  }),
});
const updateUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    role: z.enum([...userRole] as [string, ...string[]]).optional(),
    phoneNumber: z.string().optional(),
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    address: z.string().optional(),
    income: z.number().optional(),
    budget: z.number().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
