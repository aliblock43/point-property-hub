
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiry_type: "general"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          subject: formData.subject,
          message: formData.message,
          inquiry_type: formData.inquiry_type,
          status: 'unread'
        }]);

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiry_type: "general"
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Ready to find your dream property or sell your current one? 
              Our expert team is here to help you every step of the way.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
                  Send us a Message
                </CardTitle>
                <p className="text-gray-600 text-sm sm:text-base">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+92 321-8451083"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inquiry Type
                      </label>
                      <Select value={formData.inquiry_type} onValueChange={(value) => handleChange("inquiry_type", value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="buying">Buying Property</SelectItem>
                          <SelectItem value="selling">Selling Property</SelectItem>
                          <SelectItem value="valuation">Property Valuation</SelectItem>
                          <SelectItem value="investment">Investment Opportunity</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      placeholder="What's this about?"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell us more about your needs..."
                      rows={6}
                      required
                      className="w-full resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Office Address</h3>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      123 Real Estate Ave<br />
                      Suite 100<br />
                      Lahore, Punjab 54000
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Phone</h3>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">+92 321-8451083</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Email</h3>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">info@realestate.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Business Hours</h3>
                    <div className="text-gray-600 mt-1 space-y-1 text-sm sm:text-base">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">
                  Quick Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  Need immediate assistance? Call us directly and speak with one of our property experts.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700 py-2 sm:py-3">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Location Section */}
        <div className="mt-8 sm:mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
                Our Location
              </CardTitle>
              <p className="text-gray-600 text-center text-sm sm:text-base px-4">
                Visit us at our office or find us on the map below
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full h-64 sm:h-80 lg:h-96 relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.869667958066!2d74.4315769!3d31.510555399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190f14fa499f17%3A0xc5359add9b7b7c2!2sProperty%20Point%20Estate%20(R)!5e1!3m2!1sen!2s!4v1751830284974!5m2!1sen!2s"
                  className="w-full h-full border-0 rounded-b-lg"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Property Point Estate Location"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
