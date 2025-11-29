import fs from "fs";
import path from "path";
import {
  type BlogPost,
  type InsertBlogPost,
  type ContactSubmission,
  type InsertContactSubmission,
} from "@shared/schema";

const DATA_DIR = path.join(process.cwd(), ".data");
const BLOG_FILE = path.join(DATA_DIR, "blog-posts.json");
const CONTACT_FILE = path.join(DATA_DIR, "contact-submissions.json");

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Load JSON file with fallback to empty array
function loadJSON<T>(filePath: string, defaultValue: T[]): T[] {
  ensureDataDir();
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error);
      return defaultValue;
    }
  }
  return defaultValue;
}

// Save JSON file
function saveJSON<T>(filePath: string, data: T[]) {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Parse dates when loading
function parseDate(dateStr: string | Date): Date {
  if (typeof dateStr === "string") {
    return new Date(dateStr);
  }
  return dateStr;
}

export class FileStorage {
  private blogPosts: BlogPost[] = [];
  private contactSubmissions: ContactSubmission[] = [];
  private nextBlogId = 1;
  private nextContactId = 1;

  constructor() {
    this.loadData();
  }

  private loadData() {
    // Load blog posts
    const posts = loadJSON<any>(BLOG_FILE, []);
    this.blogPosts = posts.map((p) => ({
      ...p,
      publishedAt: parseDate(p.publishedAt),
    }));
    this.nextBlogId = this.blogPosts.length > 0 
      ? Math.max(...this.blogPosts.map(p => p.id)) + 1 
      : 1;

    // Load contact submissions
    const submissions = loadJSON<any>(CONTACT_FILE, []);
    this.contactSubmissions = submissions.map((s) => ({
      ...s,
      submittedAt: parseDate(s.submittedAt),
    }));
    this.nextContactId = this.contactSubmissions.length > 0 
      ? Math.max(...this.contactSubmissions.map(s => s.id)) + 1 
      : 1;
  }

  private saveBlogPosts() {
    saveJSON(BLOG_FILE, this.blogPosts);
  }

  private saveContactSubmissions() {
    saveJSON(CONTACT_FILE, this.contactSubmissions);
  }

  // Blog methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return [...this.blogPosts].sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
    );
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return this.blogPosts
      .filter((p) => p.isPublished)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return this.blogPosts.find((p) => p.slug === slug);
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.find((p) => p.id === id);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const newPost: BlogPost = {
      ...post,
      id: this.nextBlogId++,
      publishedAt: new Date(),
      isPublished: post.isPublished ?? true,
      authorAvatar: post.authorAvatar ?? null,
      imageUrl: post.imageUrl ?? null,
    };
    this.blogPosts.push(newPost);
    this.saveBlogPosts();
    return newPost;
  }

  async updateBlogPost(id: number, update: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const index = this.blogPosts.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    this.blogPosts[index] = { ...this.blogPosts[index], ...update };
    this.saveBlogPosts();
    return this.blogPosts[index];
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const index = this.blogPosts.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.blogPosts.splice(index, 1);
    this.saveBlogPosts();
    return true;
  }

  // Contact methods
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return [...this.contactSubmissions].sort(
      (a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()
    );
  }

  async getContactSubmissionById(id: number): Promise<ContactSubmission | undefined> {
    return this.contactSubmissions.find((s) => s.id === id);
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const newSubmission: ContactSubmission = {
      ...submission,
      id: this.nextContactId++,
      submittedAt: new Date(),
      isRead: false,
      company: submission.company ?? null,
    };
    this.contactSubmissions.push(newSubmission);
    this.saveContactSubmissions();
    console.log("New contact submission:", newSubmission);
    return newSubmission;
  }

  async markContactSubmissionAsRead(id: number): Promise<boolean> {
    const submission = this.contactSubmissions.find((s) => s.id === id);
    if (!submission) return false;
    submission.isRead = true;
    this.saveContactSubmissions();
    return true;
  }
}

export const storage = new FileStorage();
