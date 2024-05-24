import { z } from "zod";

const passwordRegex = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9!@#$%^&*]).{10,}$",
);
const passwordValidationError =
  "Password must be at least 10 characters long with at least one uppercase, one lower case and one number or symbol character.";

export const updateUserSchema = z.object({
  body: z
    .object({
      password: z
        .string()
        .regex(passwordRegex, passwordValidationError)
        .optional(),
      name: z.string().optional(),
      email: z.string().email().optional(),
    })
    .strict(),
});
export type TUpdateUserSchema = z.TypeOf<typeof updateUserSchema>["body"];

export const userQuerySchema = z.object({
  query: z
    .object({
      page: z.number().optional(),
      limit: z.number().optional(),
      sortField: z.string().optional(),
      sortOrder: z.enum(["asc", "desc"]),
    })
    .strict(),
});
export type TUserQuerySchema = z.TypeOf<typeof userQuerySchema>["query"];

