import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  FileText, 
  Mail,
  Plus,
  BarChart3,
  TrendingUp
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { BlogPost, ContactSubmission } from "@shared/schema";

export default function AdminDashboard() {
  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blog"]
  });

  const { data: contacts = [] } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contact-submissions"]
  });

  const stats = [
    {
      title: "Blog Posts",
      value: blogPosts.length,
      icon: FileText,
      color: "bg-blue-500",
      link: "/admin/blog"
    },
    {
      title: "Contact Messages",
      value: contacts.length,
      icon: Mail,
      color: "bg-orange-500",
      link: "/admin/contacts"
    }
  ];

  const publishedBlogPosts = blogPosts.filter((post: BlogPost) => post.isPublished);
  const unreadContacts = contacts.filter((c: ContactSubmission) => !c.isRead);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card dark:bg-card">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your Innovixus website content</p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/">
                <Button variant="outline">View Website</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-md ${stat.color}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <Link href={stat.link}>
                    <Button variant="ghost" size="sm" className="mt-2 h-8 px-2">
                      Manage
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/blog">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Create New Blog Post
                </Button>
              </Link>
              <Link href="/admin/contacts">
                <Button className="w-full justify-start" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  View Contact Messages
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Content Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Published Blog Posts</span>
                <Badge variant="secondary">{publishedBlogPosts.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Unread Messages</span>
                <Badge variant={unreadContacts.length > 0 ? "destructive" : "secondary"}>
                  {unreadContacts.length}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Recent Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blogPosts.slice(0, 3).map((post: BlogPost) => (
                <div key={post.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <h4 className="font-medium">{post.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {post.category} • {post.author}
                    </p>
                  </div>
                  <Badge variant={post.isPublished ? "default" : "secondary"}>
                    {post.isPublished ? "Published" : "Draft"}
                  </Badge>
                </div>
              ))}
              
              {blogPosts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No content yet. Start by creating your first blog post!</p>
                  <Link href="/admin/blog">
                    <Button className="mt-4">Create Blog Post</Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
