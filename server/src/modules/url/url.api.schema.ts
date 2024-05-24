import { z } from "zod";

export const createUrlSchema = z.object({
  body: z
    .object({
      redirectUrl: z.string({
        required_error: "Redirect url is required",
        invalid_type_error: "Redirect url must be a string",
      }),
    })
    .strict(),
});
export type TCreateUrlSchema = z.infer<typeof createUrlSchema>["body"];

