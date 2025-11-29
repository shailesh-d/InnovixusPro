import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HTMLEditor } from "@/components/HTMLEditor";

export default function AdminBlog() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: posts = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/admin/blog"]
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/admin/blog", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      setIsCreating(false);
      setContent("");
      toast({ title: "Blog post created successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to create blog post", variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: any) => {
      const res = await apiRequest("PATCH", `/api/admin/blog/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      setEditingPost(null);
      setContent("");
      toast({ title: "Blog post updated successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to update blog post", variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/admin/blog/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({ title: "Blog post deleted successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to delete blog post", variant: "destructive" });
    }
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      excerpt: formData.get("excerpt") as string,
      content: content,
      category: formData.get("category") as string,
      author: formData.get("author") as string,
      authorAvatar: formData.get("authorAvatar") as string,
      imageUrl: formData.get("imageUrl") as string,
      isPublished: formData.get("isPublished") === "on"
    };

    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEditPost = (post: any) => {
    setEditingPost(post);
    setContent(post.content);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Blog Management</h1>
                <p className="text-muted-foreground">Create and manage blog posts</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button onClick={() => {
                setIsCreating(true);
                setContent("");
              }}>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {(isCreating || editingPost) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingPost ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input 
                      name="title" 
                      defaultValue={editingPost?.title || ""} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Slug</label>
                    <Input 
                      name="slug" 
                      defaultValue={editingPost?.slug || ""} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <Input 
                      name="category" 
                      defaultValue={editingPost?.category || ""} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Author</label>
                    <Input 
                      name="author" 
                      defaultValue={editingPost?.author || ""} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Author Avatar URL</label>
                    <Input 
                      name="authorAvatar" 
                      defaultValue={editingPost?.authorAvatar || ""} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Image URL</label>
                    <Input 
                      name="imageUrl" 
                      defaultValue={editingPost?.imageUrl || ""} 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Excerpt</label>
                  <Textarea 
                    name="excerpt" 
                    defaultValue={editingPost?.excerpt || ""} 
                    rows={3}
                    required 
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Content</label>
                  <HTMLEditor 
                    value={content}
                    onChange={setContent}
                    placeholder="Enter your blog post content here..."
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    name="isPublished" 
                    defaultChecked={editingPost?.isPublished || false} 
                  />
                  <label className="text-sm font-medium">Published</label>
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {editingPost ? "Update" : "Create"} Post
                  </Button>
                  <Button type="button" variant="outline" onClick={() => {
                    setIsCreating(false);
                    setEditingPost(null);
                    setContent("");
                  }}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {posts && posts.map((post: any) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                      <Badge variant={post.isPublished ? "default" : "secondary"}>
                        {post.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditPost(post)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteMutation.mutate(post.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {!posts || posts.length === 0 && !isCreating && (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
                <p className="text-muted-foreground mb-4">Start by creating your first blog post</p>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Post
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}