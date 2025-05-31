import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { ArrowLeft, Mail, MailOpen, Calendar } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AdminContacts() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["/api/admin/contacts"]
  });

  const markReadMutation = useMutation({
    mutationFn: async (id: number) => apiRequest(`/api/admin/contacts/${id}/read`, { method: "PUT" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts"] });
      toast({ title: "Message marked as read" });
    }
  });

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  const unreadCount = contacts.filter((c: any) => !c.isRead).length;

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
                <h1 className="text-2xl font-bold">Contact Messages</h1>
                <p className="text-muted-foreground">
                  Manage customer inquiries • {unreadCount} unread
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="space-y-4">
          {contacts.map((contact: any) => (
            <Card key={contact.id} className={`${!contact.isRead ? 'ring-2 ring-primary/20' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{contact.name}</h3>
                      <Badge variant={contact.isRead ? "secondary" : "default"}>
                        {contact.isRead ? "Read" : "Unread"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {contact.email}
                      </span>
                      {contact.company && (
                        <span>{contact.company}</span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(contact.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-foreground">{contact.message}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {!contact.isRead && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => markReadMutation.mutate(contact.id)}
                        disabled={markReadMutation.isPending}
                      >
                        <MailOpen className="h-4 w-4 mr-1" />
                        Mark Read
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`mailto:${contact.email}?subject=Re: Your inquiry&body=Hello ${contact.name},%0D%0A%0D%0AThank you for contacting Innovixus.`)}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {contacts.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                <p className="text-muted-foreground">Contact messages will appear here</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}