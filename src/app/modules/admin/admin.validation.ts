import z from "zod";
import { adminRole } from "./admin.constant";
const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    role: z.enum([...adminRole] as [string, ...string[]], {
      required_error: "Role is required",
    }),
    PhoneNumber: z.string({
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
  }),
});
const updateAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    role: z.enum([...adminRole] as [string, ...string[]]).optional(),
    PhoneNumber: z.string().optional(),
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    address: z.string().optional(),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
  updateAdminZodSchema,
};
