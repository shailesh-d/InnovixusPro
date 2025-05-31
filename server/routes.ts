import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog routes
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      if (!post.isPublished) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Success stories routes
  app.get("/api/success-stories", async (req, res) => {
    try {
      const stories = await storage.getPublishedSuccessStories();
      res.json(stories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch success stories" });
    }
  });

  app.get("/api/success-stories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid success story ID" });
      }
      
      const story = await storage.getSuccessStoryById(id);
      
      if (!story) {
        return res.status(404).json({ error: "Success story not found" });
      }
      
      if (!story.isPublished) {
        return res.status(404).json({ error: "Success story not found" });
      }
      
      res.json(story);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch success story" });
    }
  });

  // Testimonials routes
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getPublishedTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // Contact form route
  app.post("/api/contact", async (req, res) => {
    try {
      const validationResult = insertContactSubmissionSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: validationResult.error.errors 
        });
      }
      
      const submission = await storage.createContactSubmission(validationResult.data);
      
      // Here you would typically send an email notification
      console.log("New contact submission:", submission);
      
      res.status(201).json({ 
        message: "Contact form submitted successfully",
        id: submission.id 
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // Admin routes (for managing content)
  app.get("/api/admin/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact submissions" });
    }
  });

  app.patch("/api/admin/contact-submissions/:id/read", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid submission ID" });
      }
      
      const success = await storage.markContactSubmissionAsRead(id);
      
      if (!success) {
        return res.status(404).json({ error: "Contact submission not found" });
      }
      
      res.json({ message: "Contact submission marked as read" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update contact submission" });
    }
  });

  // SEO routes
  app.get("/sitemap.xml", (req, res) => {
    res.set('Content-Type', 'text/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://innovixus.co/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://innovixus.co/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://innovixus.co/services</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://innovixus.co/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://innovixus.co/success-stories</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://innovixus.co/reviews</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://innovixus.co/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.6</priority>
  </url>
</urlset>`);
  });

  app.get("/robots.txt", (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(`User-agent: *
Allow: /

Sitemap: https://innovixus.co/sitemap.xml`);
  });

  const httpServer = createServer(app);
  return httpServer;
}
