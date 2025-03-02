import z from "zod";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6).optional(),
  url: z.array(z.string().uuid()).optional(),
});

const urlSchema = z.object({
  url: z.string().url(),
  shorturl: z.string(),
  updatedAt: z.date().optional(),
});

export { userSchema, urlSchema };
