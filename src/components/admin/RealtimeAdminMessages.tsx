
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Trash2, Clock, User, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read';
  created_at: string;
}

const RealtimeAdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch initial messages - commented out until contact_messages table exists
    // fetchMessages();

    // Mock data for now
    setMessages([]);
    setLoading(false);

    // Set up real-time subscription - commented out until table exists
    /*
    const channel = supabase
      .channel('admin-messages-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_messages'
        },
        (payload) => {
          console.log('Real-time message change:', payload);
          
          if (payload.eventType === 'INSERT') {
            setMessages(prev => [payload.new as Message, ...prev]);
            toast({
              title: "New Message Received",
              description: `New message from ${payload.new.name}`,
            });
          } else if (payload.eventType === 'UPDATE') {
            setMessages(prev => 
              prev.map(msg => 
                msg.id === payload.new.id ? payload.new as Message : msg
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setMessages(prev => 
              prev.filter(msg => msg.id !== payload.old.id)
            );
            toast({
              title: "Message Deleted",
              description: "A message has been removed.",
              variant: "destructive",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    */
  }, [toast]);

  const fetchMessages = async () => {
    try {
      // Commented out until contact_messages table exists
      /*
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
      */
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch messages. This is expected if the contact_messages table doesn't exist yet.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      // Commented out until contact_messages table exists
      /*
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: 'read' })
        .eq('id', id);

      if (error) throw error;
      */
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      // Commented out until contact_messages table exists
      /*
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      */
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: "Error",
        description: "Failed to delete message.",
        variant: "destructive",
      });
    }
  };

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    if (message.status === 'unread') {
      markAsRead(message.id);
    }
  };

  const unreadCount = messages.filter(msg => msg.status === 'unread').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Mail className="w-6 h-6 text-orange-600" />
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            Real-time
          </Badge>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 hover:bg-red-600">
              {unreadCount} unread
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-3">
          {messages.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Messages
                </h3>
                <p className="text-gray-600 text-center">
                  No contact messages have been received yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            messages.map((message) => (
              <Card 
                key={message.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedMessage?.id === message.id ? 'ring-2 ring-orange-500' : ''
                } ${message.status === 'unread' ? 'bg-orange-50 border-orange-200' : ''}`}
                onClick={() => handleMessageClick(message)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-sm">{message.name}</span>
                      {message.status === 'unread' && (
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                    {message.subject}
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {message.message}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{selectedMessage.subject}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      From: {selectedMessage.name} ({selectedMessage.email})
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(new Date(selectedMessage.created_at), { addSuffix: true })}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteMessage(selectedMessage.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t">
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                    <Mail className="w-4 h-4 mr-2" />
                    Reply to {selectedMessage.name}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-20">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Select a message to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealtimeAdminMessages;
