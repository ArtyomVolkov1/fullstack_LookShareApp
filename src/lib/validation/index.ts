import * as z from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(2, { message: "Слишком коротко" }).max(20),
  username: z.string().min(2, { message: "Слишком коротко" }).max(20),
  email: z.string().email(),
  password: z.string().min(8, { message: "Слишком коротко" }).max(20),
});

export const SigninSchema = z.object({
  email: z.string().email({message: "Неверный email"}),
  password: z.string().min(8, { message: "Слишком коротко" }).max(20),
});

export const PostSchema = z.object({
  caption: z.string().min(5, { message: "Слишком коротко" }).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
});