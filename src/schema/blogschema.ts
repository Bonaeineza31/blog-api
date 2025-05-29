// src/schemas/blog.schema.ts

import { z } from 'zod';

// ✅ Create Blog Post
export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    body: z.string().min(10, "Body must be at least 10 characters long")
  })
});

// ✅ Update Blog Post
export const updatePostSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9]+$/, "Post ID must be a number")
  }),
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    body: z.string().min(10, "Body must be at least 10 characters long")
  })
});

// ✅ Get Single Post
export const getPostByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9]+$/, "Post ID must be a number")
  })
});

// ✅ Delete Blog Post
export const deletePostSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9]+$/, "Post ID must be a number")
  })
});
