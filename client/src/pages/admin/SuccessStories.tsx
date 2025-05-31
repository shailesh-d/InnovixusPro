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

export default function AdminSuccessStories() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["/api/admin/success-stories"]
  });

  const createMutation = useMutation({
    mutationFn: async (data) => apiRequest("/api/admin/success-stories", { method: "POST", body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/success-stories"] });
      queryClient.invalidateQueries({ queryKey: ["/api/success-stories"] });
      setIsCreating(false);
      toast({ title: "Success story created successfully!" });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      client: formData.get("client"),
      description: formData.get("description"),
      imageUrl: formData.get("imageUrl"),
      technologies: formData.get("technologies")?.split(",").map(t => t.trim()).filter(Boolean),
      metric1Value: formData.get("metric1Value"),
      metric1Label: formData.get("metric1Label"),
      metric2Value: formData.get("metric2Value"),
      metric2Label: formData.get("metric2Label"),
      metric3Value: formData.get("metric3Value"),
      metric3Label: formData.get("metric3Label"),
      isPublished: formData.get("isPublished") === "on"
    };

    createMutation.mutate(data);
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
                <h1 className="text-2xl font-bold">Success Stories Management</h1>
                <p className="text-muted-foreground">Showcase your project successes</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Success Story
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {isCreating && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create New Success Story</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input name="title" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Client</label>
                    <Input name="client" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea name="description" rows={4} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Image URL</label>
                    <Input name="imageUrl" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Technologies (comma-separated)</label>
                    <Input name="technologies" placeholder="React, Node.js, PostgreSQL" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Metric 1 Value</label>
                    <Input name="metric1Value" placeholder="50%" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Metric 1 Label</label>
                    <Input name="metric1Label" placeholder="Performance Increase" required />
                  </div>
                  <div></div>
                  <div>
                    <label className="text-sm font-medium">Metric 2 Value</label>
                    <Input name="metric2Value" placeholder="30%" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Metric 2 Label</label>
                    <Input name="metric2Label" placeholder="Cost Reduction" required />
                  </div>
                  <div></div>
                  <div>
                    <label className="text-sm font-medium">Metric 3 Value</label>
                    <Input name="metric3Value" placeholder="24/7" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Metric 3 Label</label>
                    <Input name="metric3Label" placeholder="Uptime" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch name="isPublished" defaultChecked />
                  <label className="text-sm font-medium">Published</label>
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit" disabled={createMutation.isPending}>
                    Create Success Story
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {stories.map((story) => (
            <Card key={story.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{story.title}</h3>
                      <Badge variant={story.isPublished ? "default" : "secondary"}>
                        {story.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Client: {story.client}</p>
                    <p className="text-muted-foreground mb-3">{story.description}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="font-medium">{story.metric1Value}</span>
                      <span className="text-muted-foreground">{story.metric1Label}</span>
                      <span className="font-medium">{story.metric2Value}</span>
                      <span className="text-muted-foreground">{story.metric2Label}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
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