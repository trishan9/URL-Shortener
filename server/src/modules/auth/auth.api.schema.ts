import { z } from "zod";

const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9!@#$%^&*]).{10,}$');
const passwordValidationError =
    'Password must be at least 10 characters long with at least one uppercase, one lower case and one number or symbol character.';

export const userSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
        }),
        email: z
            .string({
                required_error: "Email is required",
                invalid_type_error: "Email must be a string",
            })
            .email("Not a valid email"),
        password: z.string().regex(passwordRegex, passwordValidationError),
    }).strict(),
});
export type TUserSchema = z.TypeOf<typeof userSchema>["body"];

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    }).strict(),
});
export type TLoginSchema = z.TypeOf<typeof loginSchema>["body"];

export type DecodedToken = {
    id: string;
    role: string;
    iat: number;
    exp: number;
    sub: string;
};