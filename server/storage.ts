import { 
  blogPosts, contactSubmissions,
  type BlogPost, type InsertBlogPost,
  type ContactSubmission, type InsertContactSubmission
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmissionById(id: number): Promise<ContactSubmission | undefined>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  markContactSubmissionAsRead(id: number): Promise<boolean>;
}

// In-memory storage for fallback when database is unavailable
class MemoryStorage implements IStorage {
  private blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Digital Transformation: A Guide for Modern Businesses",
      slug: "digital-transformation-guide",
      excerpt: "Learn how digital transformation can revolutionize your business operations and drive growth in the modern marketplace.",
      content: `<h2>What is Digital Transformation?</h2>
<p>Digital transformation is the integration of digital technology into all areas of a business, fundamentally changing how you operate and deliver value to customers. It's also a cultural change that requires organizations to continually challenge the status quo, experiment, and get comfortable with failure.</p>

<h2>Why Digital Transformation Matters</h2>
<p>In today's fast-paced digital economy, businesses that fail to adapt risk being left behind. Digital transformation enables organizations to:</p>
<ul>
<li>Improve operational efficiency</li>
<li>Enhance customer experiences</li>
<li>Drive innovation and growth</li>
<li>Stay competitive in evolving markets</li>
</ul>

<h2>Key Steps to Get Started</h2>
<p>Starting your digital transformation journey requires careful planning and execution. Begin by assessing your current technology landscape, identifying areas for improvement, and setting clear goals for what you want to achieve.</p>`,
      category: "Digital Transformation",
      author: "Innovixus Team",
      authorAvatar: null,
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
      publishedAt: new Date("2024-11-15"),
      isPublished: true
    },
    {
      id: 2,
      title: "Cloud Computing Best Practices for Small Businesses",
      slug: "cloud-computing-best-practices",
      excerpt: "Discover the essential cloud computing strategies that can help small businesses scale efficiently and reduce costs.",
      content: `<h2>Why Cloud Computing?</h2>
<p>Cloud computing offers small businesses access to enterprise-level technology without the significant upfront investment. From storage to software, the cloud provides scalable solutions that grow with your business.</p>

<h2>Choosing the Right Cloud Provider</h2>
<p>When selecting a cloud provider, consider factors such as:</p>
<ul>
<li>Pricing structure and scalability</li>
<li>Security features and compliance</li>
<li>Integration capabilities</li>
<li>Customer support quality</li>
</ul>

<h2>Security Considerations</h2>
<p>While cloud providers offer robust security measures, businesses must also implement their own security protocols. This includes access management, data encryption, and regular security audits.</p>`,
      category: "Cloud Services",
      author: "Innovixus Team",
      authorAvatar: null,
      imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800",
      publishedAt: new Date("2024-11-10"),
      isPublished: true
    },
    {
      id: 3,
      title: "Cybersecurity Essentials Every Business Should Know",
      slug: "cybersecurity-essentials",
      excerpt: "Protect your business from cyber threats with these essential security measures and best practices.",
      content: `<h2>The Growing Threat Landscape</h2>
<p>Cyber attacks are becoming increasingly sophisticated and frequent. Businesses of all sizes are targets, making robust cybersecurity measures essential for survival.</p>

<h2>Essential Security Measures</h2>
<p>Implement these fundamental security practices:</p>
<ul>
<li>Multi-factor authentication</li>
<li>Regular software updates and patches</li>
<li>Employee security training</li>
<li>Data backup and recovery plans</li>
<li>Network monitoring and threat detection</li>
</ul>

<h2>Building a Security Culture</h2>
<p>Technology alone cannot protect your business. Creating a culture of security awareness among employees is crucial for preventing human error-based vulnerabilities.</p>`,
      category: "Cybersecurity",
      author: "Innovixus Team",
      authorAvatar: null,
      imageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800",
      publishedAt: new Date("2024-11-05"),
      isPublished: true
    }
  ];
  
  private contactSubmissions: ContactSubmission[] = [];
  private nextBlogId = 4;
  private nextContactId = 1;

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return [...this.blogPosts].sort((a, b) => 
      new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()
    );
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return this.blogPosts
      .filter(p => p.isPublished)
      .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return this.blogPosts.find(p => p.slug === slug);
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.find(p => p.id === id);
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
    return newPost;
  }

  async updateBlogPost(id: number, update: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const index = this.blogPosts.findIndex(p => p.id === id);
    if (index === -1) return undefined;
    this.blogPosts[index] = { ...this.blogPosts[index], ...update };
    return this.blogPosts[index];
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const index = this.blogPosts.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.blogPosts.splice(index, 1);
    return true;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return [...this.contactSubmissions].sort((a, b) => 
      new Date(b.submittedAt!).getTime() - new Date(a.submittedAt!).getTime()
    );
  }

  async getContactSubmissionById(id: number): Promise<ContactSubmission | undefined> {
    return this.contactSubmissions.find(s => s.id === id);
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
    return newSubmission;
  }

  async markContactSubmissionAsRead(id: number): Promise<boolean> {
    const submission = this.contactSubmissions.find(s => s.id === id);
    if (!submission) return false;
    submission.isRead = true;
    return true;
  }
}

class DatabaseStorage implements IStorage {
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts)
      .where(eq(blogPosts.isPublished, true))
      .orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(insertPost).returning();
    return post;
  }

  async updateBlogPost(id: number, updatePost: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [post] = await db.update(blogPosts)
      .set(updatePost)
      .where(eq(blogPosts.id, id))
      .returning();
    return post || undefined;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.submittedAt));
  }

  async getContactSubmissionById(id: number): Promise<ContactSubmission | undefined> {
    const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return submission || undefined;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await db.insert(contactSubmissions).values(insertSubmission).returning();
    return submission;
  }

  async markContactSubmissionAsRead(id: number): Promise<boolean> {
    const result = await db.update(contactSubmissions)
      .set({ isRead: true })
      .where(eq(contactSubmissions.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

// Wrapper storage that falls back to memory storage when database fails
class FallbackStorage implements IStorage {
  private dbStorage = new DatabaseStorage();
  private memStorage = new MemoryStorage();
  private useMemory = false;

  private async withFallback<T>(dbOperation: () => Promise<T>, memOperation: () => Promise<T>): Promise<T> {
    if (this.useMemory) {
      return memOperation();
    }
    
    try {
      return await dbOperation();
    } catch (error) {
      console.log("Database unavailable, using in-memory storage");
      this.useMemory = true;
      return memOperation();
    }
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return this.withFallback(
      () => this.dbStorage.getAllBlogPosts(),
      () => this.memStorage.getAllBlogPosts()
    );
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return this.withFallback(
      () => this.dbStorage.getPublishedBlogPosts(),
      () => this.memStorage.getPublishedBlogPosts()
    );
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return this.withFallback(
      () => this.dbStorage.getBlogPostBySlug(slug),
      () => this.memStorage.getBlogPostBySlug(slug)
    );
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.withFallback(
      () => this.dbStorage.getBlogPostById(id),
      () => this.memStorage.getBlogPostById(id)
    );
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    return this.withFallback(
      () => this.dbStorage.createBlogPost(post),
      () => this.memStorage.createBlogPost(post)
    );
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    return this.withFallback(
      () => this.dbStorage.updateBlogPost(id, post),
      () => this.memStorage.updateBlogPost(id, post)
    );
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    return this.withFallback(
      () => this.dbStorage.deleteBlogPost(id),
      () => this.memStorage.deleteBlogPost(id)
    );
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return this.withFallback(
      () => this.dbStorage.getAllContactSubmissions(),
      () => this.memStorage.getAllContactSubmissions()
    );
  }

  async getContactSubmissionById(id: number): Promise<ContactSubmission | undefined> {
    return this.withFallback(
      () => this.dbStorage.getContactSubmissionById(id),
      () => this.memStorage.getContactSubmissionById(id)
    );
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    return this.withFallback(
      () => this.dbStorage.createContactSubmission(submission),
      () => this.memStorage.createContactSubmission(submission)
    );
  }

  async markContactSubmissionAsRead(id: number): Promise<boolean> {
    return this.withFallback(
      () => this.dbStorage.markContactSubmissionAsRead(id),
      () => this.memStorage.markContactSubmissionAsRead(id)
    );
  }
}

export const storage = new FallbackStorage();
