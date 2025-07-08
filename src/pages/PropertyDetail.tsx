
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Bed, Bath, Square, Calendar, Heart, Share, Phone, Mail, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  year_built: number;
  description: string;
  images: string[];
  amenities: string[];
  featured: boolean;
  slug: string;
}

const PropertyDetail = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  useEffect(() => {
    if (slug) {
      fetchProperty();
    }
  }, [slug]);

  const fetchProperty = async () => {
    try {
      console.log('Fetching property with slug:', slug);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'active')
        .single();

      if (error) {
        console.error('Error fetching property:', error);
        throw error;
      }

      console.log('Fetched property:', data);
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property:', error);
      toast({
        title: "Error",
        description: "Failed to fetch property details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully. We'll get back to you soon!",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600">The property you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={property.images?.[currentImageIndex] || '/placeholder.svg'}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                {property.featured && (
                  <Badge className="absolute top-4 left-4 bg-blue-600">
                    Featured
                  </Badge>
                )}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button size="sm" variant="secondary">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Thumbnail Images */}
              {property.images && property.images.length > 1 && (
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          currentImageIndex === index ? 'border-blue-600' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${property.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Property Details */}
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-lg">{property.location}</span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    PKR {property.price}
                  </div>
                  <Badge variant="outline" className="mt-2">
                    {property.type}
                  </Badge>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {property.bedrooms && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bed className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bath className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                )}
                {property.area && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Square className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">{property.area}</div>
                    <div className="text-sm text-gray-600">Area</div>
                  </div>
                )}
                {property.year_built && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">{property.year_built}</div>
                    <div className="text-sm text-gray-600">Year Built</div>
                  </div>
                )}
              </div>

              {/* Description */}
              {property.description && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Description</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {property.description}
                  </p>
                </div>
              )}

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Amenities & Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Map Section */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Location</h2>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Map will be displayed here</p>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Form */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Interested in this property?</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
                <Input
                  type="tel"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Send Message
                </Button>
              </form>
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold">Call us directly:</span>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    +92 300 1234567
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    info@propertypoint.com
                  </Button>
                </div>
              </div>
            </Card>

            {/* Agent Info - Updated to use real team member */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Your Agent</h3>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img 
                    src="/lovable-uploads/79a7b6f3-488f-4fbb-ad38-210fc36d9e79.png" 
                    alt="Umer Shahid"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold">Umer Shahid</div>
                  <div className="text-sm text-gray-600">Chief Executive Officer</div>
                  <div className="text-sm text-blue-600">Licensed Realtor</div>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                With over 12 years of experience in the real estate market, Umer specializes in luxury properties and investment opportunities across DHA developments.
              </p>
              <Button variant="outline" className="w-full">
                Contact Umer Shahid
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
