import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  author: text("author").notNull(),
  authorAvatar: text("author_avatar"),
  imageUrl: text("image_url"),
  publishedAt: timestamp("published_at").defaultNow(),
  isPublished: boolean("is_published").default(true),
});

export const successStories = pgTable("success_stories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  client: text("client").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  technologies: text("technologies").array(),
  metric1Value: text("metric1_value").notNull(),
  metric1Label: text("metric1_label").notNull(),
  metric2Value: text("metric2_value").notNull(),
  metric2Label: text("metric2_label").notNull(),
  metric3Value: text("metric3_value"),
  metric3Label: text("metric3_label"),
  isPublished: boolean("is_published").default(true),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  company: text("company").notNull(),
  content: text("content").notNull(),
  avatar: text("avatar"),
  rating: integer("rating").default(5),
  isPublished: boolean("is_published").default(true),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
  isRead: boolean("is_read").default(false),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  publishedAt: true,
});

export const insertSuccessStorySchema = createInsertSchema(successStories).omit({
  id: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  submittedAt: true,
  isRead: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type SuccessStory = typeof successStories.$inferSelect;
export type InsertSuccessStory = z.infer<typeof insertSuccessStorySchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
