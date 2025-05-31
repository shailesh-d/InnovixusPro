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
import { ArrowLeft, Plus, Edit, Trash2, Star } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AdminTestimonials() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["/api/admin/testimonials"]
  });

  const createMutation = useMutation({
    mutationFn: async (data) => apiRequest("/api/admin/testimonials", { method: "POST", body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      setIsCreating(false);
      toast({ title: "Testimonial created successfully!" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => apiRequest(`/api/admin/testimonials/${id}`, { method: "PUT", body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      setEditingTestimonial(null);
      toast({ title: "Testimonial updated successfully!" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => apiRequest(`/api/admin/testimonials/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      toast({ title: "Testimonial deleted successfully!" });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      position: formData.get("position"),
      company: formData.get("company"),
      content: formData.get("content"),
      avatar: formData.get("avatar"),
      rating: parseInt(formData.get("rating")) || 5,
      isPublished: formData.get("isPublished") === "on"
    };

    if (editingTestimonial) {
      updateMutation.mutate({ id: editingTestimonial.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

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
                <h1 className="text-2xl font-bold">Testimonials Management</h1>
                <p className="text-muted-foreground">Manage customer testimonials</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Testimonial
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {(isCreating || editingTestimonial) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingTestimonial ? "Edit Testimonial" : "Create New Testimonial"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input name="name" defaultValue={editingTestimonial?.name || ""} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Position</label>
                    <Input name="position" defaultValue={editingTestimonial?.position || ""} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Company</label>
                    <Input name="company" defaultValue={editingTestimonial?.company || ""} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Avatar URL</label>
                    <Input name="avatar" defaultValue={editingTestimonial?.avatar || ""} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Rating</label>
                    <Input 
                      name="rating" 
                      type="number" 
                      min="1" 
                      max="5" 
                      defaultValue={editingTestimonial?.rating || 5} 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Testimonial Content</label>
                  <Textarea 
                    name="content" 
                    defaultValue={editingTestimonial?.content || ""} 
                    rows={5}
                    required 
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    name="isPublished" 
                    defaultChecked={editingTestimonial?.isPublished !== false} 
                  />
                  <label className="text-sm font-medium">Published</label>
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {editingTestimonial ? "Update" : "Create"} Testimonial
                  </Button>
                  <Button type="button" variant="outline" onClick={() => {
                    setIsCreating(false);
                    setEditingTestimonial(null);
                  }}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                      <Badge variant={testimonial.isPublished ? "default" : "secondary"}>
                        {testimonial.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {testimonial.position} at {testimonial.company}
                    </p>
                    <p className="text-muted-foreground mb-3">{testimonial.content}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingTestimonial(testimonial)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteMutation.mutate(testimonial.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}