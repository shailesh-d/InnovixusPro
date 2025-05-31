import { Link } from "wouter";
import { Calendar, User, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
            {post.category}
          </span>
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(post.publishedAt || "")}
          </div>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3 hover:text-primary transition-colors">
          <Link href={`/blog/${post.slug}`}>
            <button className="text-left w-full">{post.title}</button>
          </Link>
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {post.authorAvatar && (
              <img
                src={post.authorAvatar}
                alt={`Author ${post.author} headshot`}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <span className="text-sm text-muted-foreground">{post.author}</span>
          </div>
          <Link href={`/blog/${post.slug}`}>
            <button className="text-primary font-semibold text-sm hover:text-primary/80 transition-colors flex items-center">
              Read More
              <ArrowRight className="h-3 w-3 ml-1" />
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}
