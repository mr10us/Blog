import {z} from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(100, { message: "Title must be 100 characters or less" }),
  content: z.string().min(1, { message: "Content is required" }).max(500, { message: "Content must be 500 characters or less" })
});