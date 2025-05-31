import { 
  users, blogPosts, successStories, testimonials, contactSubmissions,
  type User, type InsertUser, type BlogPost, type InsertBlogPost,
  type SuccessStory, type InsertSuccessStory, type Testimonial, type InsertTestimonial,
  type ContactSubmission, type InsertContactSubmission
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Blog methods
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;

  // Success Stories methods
  getAllSuccessStories(): Promise<SuccessStory[]>;
  getPublishedSuccessStories(): Promise<SuccessStory[]>;
  getSuccessStoryById(id: number): Promise<SuccessStory | undefined>;
  createSuccessStory(story: InsertSuccessStory): Promise<SuccessStory>;
  updateSuccessStory(id: number, story: Partial<InsertSuccessStory>): Promise<SuccessStory | undefined>;
  deleteSuccessStory(id: number): Promise<boolean>;

  // Testimonials methods
  getAllTestimonials(): Promise<Testimonial[]>;
  getPublishedTestimonials(): Promise<Testimonial[]>;
  getTestimonialById(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;

  // Contact methods
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmissionById(id: number): Promise<ContactSubmission | undefined>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  markContactSubmissionAsRead(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private blogPosts: Map<number, BlogPost>;
  private successStories: Map<number, SuccessStory>;
  private testimonials: Map<number, Testimonial>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private currentUserId: number;
  private currentBlogPostId: number;
  private currentSuccessStoryId: number;
  private currentTestimonialId: number;
  private currentContactSubmissionId: number;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.successStories = new Map();
    this.testimonials = new Map();
    this.contactSubmissions = new Map();
    this.currentUserId = 1;
    this.currentBlogPostId = 1;
    this.currentSuccessStoryId = 1;
    this.currentTestimonialId = 1;
    this.currentContactSubmissionId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample blog posts
    const samplePosts = [
      {
        title: "Building Scalable Microservices with Node.js",
        slug: "building-scalable-microservices-nodejs",
        excerpt: "Learn how to design and implement microservices architecture using Node.js, Docker, and modern deployment strategies.",
        content: "Microservices architecture has revolutionized how we build and deploy applications...",
        category: "Backend",
        author: "Arjun Patel",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
        isPublished: true
      },
      {
        title: "Complete CI/CD Pipeline Setup with GitHub Actions",
        slug: "cicd-pipeline-github-actions",
        excerpt: "Step-by-step guide to setting up automated deployment pipelines using GitHub Actions, Docker, and cloud platforms.",
        content: "Continuous Integration and Continuous Deployment (CI/CD) is essential for modern development...",
        category: "DevOps",
        author: "Priya Shah",
        authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=100&h=100&fit=crop&crop=face",
        imageUrl: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=800&h=400&fit=crop",
        isPublished: true
      },
      {
        title: "Cloud-First Architecture Strategies for Startups",
        slug: "cloud-first-architecture-startups",
        excerpt: "Essential cloud architecture patterns and best practices to build scalable, cost-effective solutions from day one.",
        content: "Starting with a cloud-first approach can save startups significant time and resources...",
        category: "Architecture",
        author: "Rohit Mehta",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
        isPublished: true
      }
    ];

    samplePosts.forEach(post => {
      this.createBlogPost(post);
    });

    // Sample success stories
    const sampleStories = [
      {
        title: "E-commerce Platform Optimization",
        client: "TechCart Solutions",
        description: "Migrated a monolithic e-commerce platform to microservices architecture, implementing robust APIs, optimizing database performance, and setting up automated deployment pipelines.",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
        technologies: ["Node.js", "Docker", "AWS", "Redis"],
        metric1Value: "300%",
        metric1Label: "Performance Improvement",
        metric2Value: "50%",
        metric2Label: "Reduced Deployment Time",
        metric3Value: "99.9%",
        metric3Label: "Uptime",
        isPublished: true
      },
      {
        title: "FinTech API Infrastructure",
        client: "SecureBank API",
        description: "Built a secure, high-performance API infrastructure for a fintech startup, implementing advanced security measures, real-time processing, and comprehensive monitoring systems.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        technologies: ["Python", "Kubernetes", "PostgreSQL", "JWT"],
        metric1Value: "99.9%",
        metric1Label: "Uptime Achieved",
        metric2Value: "10k+",
        metric2Label: "Requests/Second",
        metric3Value: "0",
        metric3Label: "Security Incidents",
        isPublished: true
      }
    ];

    sampleStories.forEach(story => {
      this.createSuccessStory(story);
    });

    // Sample testimonials
    const sampleTestimonials = [
      {
        name: "Amit Kumar",
        position: "CTO",
        company: "TechCart Solutions",
        content: "Innovixus transformed our backend infrastructure completely. Their expertise in Node.js and DevOps helped us scale from 1K to 100K users seamlessly. The team's proactive approach and technical depth exceeded our expectations.",
        avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        isPublished: true
      },
      {
        name: "Sarah Johnson",
        position: "VP Engineering",
        company: "SecureBank API",
        content: "The CI/CD pipeline implementation by Innovixus reduced our deployment time from hours to minutes. Their attention to security and best practices gave us confidence in our fintech platform. Absolutely professional and reliable.",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        isPublished: true
      },
      {
        name: "Dr. Rajesh Mehta",
        position: "Founder",
        company: "SmartCity Systems",
        content: "Working with Innovixus on our IoT platform was a game-changer. Their expertise in Golang and real-time data processing helped us handle massive sensor data efficiently. The architecture they designed scales beautifully.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        isPublished: true
      }
    ];

    sampleTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Blog methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
    );
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.isPublished)
      .sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const post: BlogPost = { 
      id,
      title: insertPost.title,
      slug: insertPost.slug,
      excerpt: insertPost.excerpt,
      content: insertPost.content,
      category: insertPost.category,
      author: insertPost.author,
      authorAvatar: insertPost.authorAvatar || null,
      imageUrl: insertPost.imageUrl || null,
      publishedAt: new Date(),
      isPublished: insertPost.isPublished !== undefined ? insertPost.isPublished : true
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: number, updatePost: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { ...post, ...updatePost };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  // Success Stories methods
  async getAllSuccessStories(): Promise<SuccessStory[]> {
    return Array.from(this.successStories.values());
  }

  async getPublishedSuccessStories(): Promise<SuccessStory[]> {
    return Array.from(this.successStories.values()).filter(story => story.isPublished);
  }

  async getSuccessStoryById(id: number): Promise<SuccessStory | undefined> {
    return this.successStories.get(id);
  }

  async createSuccessStory(insertStory: InsertSuccessStory): Promise<SuccessStory> {
    const id = this.currentSuccessStoryId++;
    const story: SuccessStory = { 
      id,
      title: insertStory.title,
      client: insertStory.client,
      description: insertStory.description,
      imageUrl: insertStory.imageUrl || null,
      technologies: insertStory.technologies || null,
      metric1Value: insertStory.metric1Value,
      metric1Label: insertStory.metric1Label,
      metric2Value: insertStory.metric2Value,
      metric2Label: insertStory.metric2Label,
      metric3Value: insertStory.metric3Value || null,
      metric3Label: insertStory.metric3Label || null,
      isPublished: insertStory.isPublished !== undefined ? insertStory.isPublished : true
    };
    this.successStories.set(id, story);
    return story;
  }

  async updateSuccessStory(id: number, updateStory: Partial<InsertSuccessStory>): Promise<SuccessStory | undefined> {
    const story = this.successStories.get(id);
    if (!story) return undefined;
    
    const updatedStory = { ...story, ...updateStory };
    this.successStories.set(id, updatedStory);
    return updatedStory;
  }

  async deleteSuccessStory(id: number): Promise<boolean> {
    return this.successStories.delete(id);
  }

  // Testimonials methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getPublishedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(testimonial => testimonial.isPublished);
  }

  async getTestimonialById(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { 
      id,
      name: insertTestimonial.name,
      position: insertTestimonial.position,
      company: insertTestimonial.company,
      content: insertTestimonial.content,
      avatar: insertTestimonial.avatar || null,
      rating: insertTestimonial.rating || 5,
      isPublished: insertTestimonial.isPublished !== undefined ? insertTestimonial.isPublished : true
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async updateTestimonial(id: number, updateTestimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const testimonial = this.testimonials.get(id);
    if (!testimonial) return undefined;
    
    const updatedTestimonial = { ...testimonial, ...updateTestimonial };
    this.testimonials.set(id, updatedTestimonial);
    return updatedTestimonial;
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    return this.testimonials.delete(id);
  }

  // Contact methods
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort((a, b) => 
      new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime()
    );
  }

  async getContactSubmissionById(id: number): Promise<ContactSubmission | undefined> {
    return this.contactSubmissions.get(id);
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactSubmissionId++;
    const submission: ContactSubmission = { 
      ...insertSubmission, 
      id, 
      submittedAt: new Date(),
      isRead: false 
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async markContactSubmissionAsRead(id: number): Promise<boolean> {
    const submission = this.contactSubmissions.get(id);
    if (!submission) return false;
    
    submission.isRead = true;
    this.contactSubmissions.set(id, submission);
    return true;
  }
}

export const storage = new MemStorage();
