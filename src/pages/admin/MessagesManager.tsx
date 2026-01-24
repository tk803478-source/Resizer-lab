import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContactMessages, useMarkMessageRead, useDeleteMessage } from "@/hooks/useAdminData";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageSquare, Trash2, Mail, MailOpen, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function MessagesManager() {
  const { data: messages, isLoading } = useContactMessages();
  const markRead = useMarkMessageRead();
  const deleteMessage = useDeleteMessage();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleView = async (message: Message) => {
    setSelectedMessage(message);
    if (!message.is_read) {
      await markRead.mutateAsync({ id: message.id, is_read: true });
    }
  };

  const handleToggleRead = async (message: Message) => {
    await markRead.mutateAsync({ id: message.id, is_read: !message.is_read });
  };

  const handleDelete = async (id: string) => {
    await deleteMessage.mutateAsync(id);
  };

  const unreadCount = messages?.filter((m) => !m.is_read).length || 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Messages</h1>
            <p className="text-muted-foreground mt-1">
              View and manage contact form submissions
              {unreadCount > 0 && (
                <span className="ml-2 text-orange-500 font-medium">
                  ({unreadCount} unread)
                </span>
              )}
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              All Messages ({messages?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : messages?.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">
                No messages received yet.
              </p>
            ) : (
              <div className="space-y-3">
                {messages?.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start justify-between p-4 rounded-lg border transition-colors ${
                      message.is_read
                        ? "border-border bg-background"
                        : "border-primary/30 bg-primary/5"
                    }`}
                  >
                    <div className="flex-1 min-w-0 cursor-pointer" onClick={() => handleView(message)}>
                      <div className="flex items-center gap-2">
                        {message.is_read ? (
                          <MailOpen className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Mail className="h-4 w-4 text-primary" />
                        )}
                        <span className="font-medium">{message.name}</span>
                        <span className="text-sm text-muted-foreground">
                          &lt;{message.email}&gt;
                        </span>
                        {!message.is_read && (
                          <Badge variant="default" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      {message.subject && (
                        <p className="font-medium mt-1 truncate">
                          {message.subject}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {message.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(message.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(message)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleRead(message)}
                      >
                        {message.is_read ? (
                          <Mail className="h-4 w-4" />
                        ) : (
                          <MailOpen className="h-4 w-4" />
                        )}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Message?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete this message.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(message.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Message Detail Dialog */}
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
            </DialogHeader>
            {selectedMessage && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedMessage.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">
                      {new Date(selectedMessage.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                {selectedMessage.subject && (
                  <div className="text-sm">
                    <p className="text-muted-foreground">Subject</p>
                    <p className="font-medium">{selectedMessage.subject}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Message</p>
                  <div className="p-4 bg-secondary rounded-lg whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" asChild>
                    <a href={`mailto:${selectedMessage.email}`}>
                      Reply via Email
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
