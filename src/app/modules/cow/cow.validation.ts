import z from "zod";
import { breeds, divisions } from "./cow.constant";
const createCowZodSchema = z.object({
  body: z.object({
    label: z.enum(["for-sale", "sold-out"], {
      required_error: "label is required",
    }),
    category: z.enum(["dairy", "beef", "dualPurpose"], {
      required_error: "category is required",
    }),
    location: z.enum([...divisions] as [string, ...string[]], {
      required_error: "label is required",
    }),
    breed: z.enum([...breeds] as [string, ...string[]], {
      required_error: "label is required",
    }),
    age: z.number({
      required_error: "Age is required",
    }),
    weight: z.number({
      required_error: "Weight is required",
    }),
    name: z.string({
      required_error: "Name is required",
    }),
    price: z.number({
      required_error: "Price is required",
    }),
  }),
});
const updateCowZodSchema = z.object({
  body: z.object({
    label: z.enum(["for-sale", "sold-out"]).optional(),
    category: z.enum(["dairy", "beef", "dualPurpose"]).optional(),
    location: z.enum([...divisions] as [string, ...string[]]).optional(),
    breed: z.enum([...breeds] as [string, ...string[]]).optional(),
    age: z.number().optional(),
    weight: z.number().optional(),
    name: z.string().optional(),
    price: z.number().optional(),
  }),
});

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};
