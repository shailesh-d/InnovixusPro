import { z } from "zod";

// Blog Post types
export const blogPostSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  category: z.string(),
  author: z.string(),
  authorAvatar: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  publishedAt: z.date(),
  isPublished: z.boolean().default(true),
});

export const insertBlogPostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  category: z.string(),
  author: z.string(),
  authorAvatar: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  isPublished: z.boolean().default(true),
});

// Contact Submission types
export const contactSubmissionSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string().email(),
  company: z.string().nullable().optional(),
  message: z.string(),
  submittedAt: z.date(),
  isRead: z.boolean().default(false),
});

export const insertContactSubmissionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

// User types (from auth)
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
}

// Inferred types
export type BlogPost = z.infer<typeof blogPostSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
