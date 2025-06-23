
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Mail, User, Calendar, Phone, Trash2, Reply, Archive } from "lucide-react";

const AdminMessages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  const messages = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "(555) 123-4567",
      subject: "Interested in Downtown Condo",
      message: "Hi, I'm very interested in the luxury downtown condo listing. Could we schedule a viewing this week? I'm available most afternoons and would love to see the property in person.",
      date: "2024-01-16 10:30 AM",
      status: "unread",
      inquiryType: "buying"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "(555) 987-6543",
      subject: "Property Valuation Request",
      message: "Hello, I would like to get a valuation for my 3-bedroom house in Oakwood Suburbs. It's approximately 2,000 sq ft and was built in 1995. When would be a good time for an assessment?",
      date: "2024-01-15 2:15 PM",
      status: "read",
      inquiryType: "valuation"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@email.com",
      phone: "",
      subject: "Investment Opportunities",
      message: "I'm looking for investment properties in the $400K-$600K range. Do you have any upcoming listings or recommendations for good rental properties?",
      date: "2024-01-14 11:45 AM",
      status: "replied",
      inquiryType: "investment"
    },
    {
      id: 4,
      name: "Lisa Chen",
      email: "lisa.chen@email.com",
      phone: "(555) 456-7890",
      subject: "First-time Home Buyer Questions",
      message: "Hi there, I'm a first-time home buyer and feeling a bit overwhelmed with the process. Could someone walk me through the steps and help me understand what I need to prepare?",
      date: "2024-01-13 4:20 PM",
      status: "unread",
      inquiryType: "buying"
    }
  ];

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-blue-600';
      case 'read': return 'bg-gray-600';
      case 'replied': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getInquiryTypeColor = (type: string) => {
    switch (type) {
      case 'buying': return 'bg-blue-100 text-blue-800';
      case 'selling': return 'bg-green-100 text-green-800';
      case 'valuation': return 'bg-purple-100 text-purple-800';
      case 'investment': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this message?")) {
      console.log("Delete message:", id);
      // Handle deletion
    }
  };

  const handleReply = (message: any) => {
    console.log("Reply to:", message);
    // Handle reply - could open email client or modal
  };

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">
            Manage contact form submissions and client inquiries
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button variant="outline">
            <Archive className="w-4 h-4 mr-2" />
            Archive Read
          </Button>
          <Button variant="outline">Mark All Read</Button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">{messages.length}</div>
            <div className="text-sm text-gray-600">Total Messages</div>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <Card 
            key={message.id} 
            className={`cursor-pointer transition-colors ${
              selectedMessage === message.id ? 'ring-2 ring-blue-500' : ''
            } ${message.status === 'unread' ? 'bg-blue-50' : ''}`}
            onClick={() => setSelectedMessage(selectedMessage === message.id ? null : message.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="font-semibold text-gray-900">{message.name}</span>
                    </div>
                    <Badge className={getStatusColor(message.status)}>
                      {message.status}
                    </Badge>
                    <Badge className={getInquiryTypeColor(message.inquiryType)}>
                      {message.inquiryType}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      <span>{message.email}</span>
                    </div>
                    {message.phone && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        <span>{message.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{message.date}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-gray-900 mb-2">
                    {message.subject}
                  </h3>
                  
                  <p className="text-gray-700 line-clamp-2">
                    {message.message}
                  </p>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReply(message);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Reply className="w-4 h-4 mr-1" />
                    Reply
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(message.id);
                    }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Expanded Message */}
              {selectedMessage === message.id && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium text-gray-900 mb-2">Full Message:</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button 
                      size="sm"
                      onClick={() => handleReply(message)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Send Email Reply
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4 mr-1" />
                      Call Client
                    </Button>
                    <Button size="sm" variant="outline">
                      Mark as Read
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredMessages.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Mail className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No messages found
            </h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms.' : 'No contact form submissions yet.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminMessages;
