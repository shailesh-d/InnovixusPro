import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const { slug } = useParams();

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${slug}`],
    enabled: !!slug
  });

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long", 
      day: "numeric"
    });
  };

  const estimatedReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (isLoading) {
    return (
      <div className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
              <div className="h-12 bg-gray-200 rounded mb-6"></div>
              <div className="h-64 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/blog">
              <Button className="btn-primary">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${post.title} | Innovixus Blog`}
        description={post.excerpt}
        url={`https://innovixus.co/blog/${post.slug}`}
        image={post.imageUrl || undefined}
        type="article"
        keywords={`${post.category}, backend development, devops, nodejs, python, golang, technology tutorials, ${post.author}`}
      />

      <article className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Navigation */}
            <div className="mb-8">
              <Link href="/blog">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
            </div>

            {/* Article Header */}
            <header className="mb-12">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center text-muted-foreground text-sm space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(post.publishedAt || "")}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {estimatedReadTime(post.content)} min read
                  </div>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-6">
                {post.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {post.excerpt}
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {post.authorAvatar && (
                    <img
                      src={post.authorAvatar}
                      alt={`Author ${post.author}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="font-semibold text-foreground">{post.author}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Technical Writer</p>
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </header>

            {/* Featured Image */}
            {post.imageUrl && (
              <div className="mb-12">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground">
              <div 
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="text-foreground leading-relaxed"
              />
            </div>

            {/* Article Footer */}
            <footer className="mt-16 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Tags:</span>
                  <span className="px-3 py-1 bg-muted text-foreground text-sm rounded-full">
                    {post.category}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Share:</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Twitter</Button>
                    <Button variant="outline" size="sm">LinkedIn</Button>
                    <Button variant="outline" size="sm">Facebook</Button>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>

      {/* Related Articles CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Enjoyed this article?</h2>
              <p className="text-xl mb-6 opacity-90">
                Discover more insights about backend development and DevOps
              </p>
              <Link href="/blog">
                <Button className="bg-white text-primary hover:bg-gray-100">
                  Read More Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
