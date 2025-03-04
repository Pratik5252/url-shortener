import z from "zod";

const userBaseSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = userBaseSchema
  .extend({
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const signinSchema = userBaseSchema;

const urlSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  shorturl: z.string(),
  updatedAt: z.date().optional(),
});

export { signinSchema, signupSchema, urlSchema };
