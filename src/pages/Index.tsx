import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Square, ArrowRight, TrendingUp, Users, Building, Award, Phone, Mail, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  type: string;
  area: string;
  images: string[];
  featured: boolean;
  slug: string;
}

const Index = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      console.log('Fetching properties...');
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'active')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Fetched properties:', data);
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({
        title: "Error",
        description: "Failed to fetch properties.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: Building, value: "500+", label: "Properties Sold" },
    { icon: Users, value: "1000+", label: "Happy Clients" },
    { icon: Award, value: "15+", label: "Years Experience" },
    { icon: TrendingUp, value: "98%", label: "Success Rate" }
  ];

  const developments = [
    {
      title: "DHA Phase 1-5",
      image: "/lovable-uploads/PHASE1-5.jpg",
      description: "Premium residential area with modern amenities"
    },
    {
      title: "DHA Phase 6",
      image: "/lovable-uploads/PHASE6.jpg",
      description: "Luxury living with commercial facilities"
    },
    {
      title: "DHA Phase 8",
      image: "/lovable-uploads/PHASE8.jpg",
      description: "Contemporary housing with green spaces"
    },
    {
      title: "DHA Phase 9",
      image: "/lovable-uploads/PHASE9.jpg",
      description: "Modern development with world-class infrastructure"
    },
    {
      title: "DHA Multan",
      image: "/lovable-uploads/DHAMUL.jpg",
      description: "Expanding horizons in Southern Punjab"
    },
    {
      title: "DHA Quetta",
      image: "/lovable-uploads/DHAQUE.jpg",
      description: "Premium living in Balochistan's capital"
    }
  ];

  const teamMembers = [
    {
      name: "Umer Shahid",
      role: "Chief Executive Officer",
      experience: "15+ Years Experience",
      image: "/lovable-uploads/79a7b6f3-488f-4fbb-ad38-210fc36d9e79.png",
      description: "Leading the company with vision and expertise in real estate development."
    },
    {
      name: "Shahid Iqbal Zia",
      role: "Director Marketing",
      experience: "12+ Years Experience", 
      image: "/src/assets/images/shahid-iqbal-zia.png",
      description: "Strategic marketing leadership driving growth and client satisfaction."
    },
    {
      name: "Adil Ilyas",
      role: "Property Consultant",
      experience: "8+ Years Experience",
      image: "/src/assets/images/adil-ilyas.png", 
      description: "Expert property consultant specializing in residential and commercial properties."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/lovable-uploads/PP1.webp')",
            filter: "brightness(0.4)"
          }}
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Find Your Dream Property in 
            <span className="text-gradient-orange block mt-2">DHA Lahore</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in">
            Premium properties, trusted service, and unmatched expertise in Pakistan's most prestigious developments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-orange text-white hover:shadow-orange hover:-translate-y-1 transition-all duration-300 text-lg px-8 py-4"
            >
              <Link to="/properties">
                Explore Properties
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover-lift">
                <div className="bg-gradient-orange-subtle p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:bg-gradient-orange transition-all duration-300">
                  <stat.icon className="w-10 h-10 text-orange-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600">
              Discover our handpicked selection of premium properties
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={property.images?.[0] || '/placeholder.svg'} 
                      alt={property.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-gradient-orange">
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{property.title}</h3>
                      <span className="text-2xl font-bold text-orange-600">
                        {property.price}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{property.location}</span>
                    </div>
                    {property.area && (
                      <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Square className="w-4 h-4 mr-1" />
                          <span>{property.area}</span>
                        </div>
                      </div>
                    )}
                    <Button asChild className="w-full bg-gradient-orange hover:shadow-orange">
                      <Link to={`/properties/${property.slug}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
              <Link to="/properties">
                View All Properties
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* DHA Developments */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              DHA Developments
            </h2>
            <p className="text-xl text-gray-600">
              Explore premium developments across Pakistan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developments.map((development, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={development.image} 
                    alt={development.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{development.title}</h3>
                  <p className="text-gray-600 mb-4">{development.description}</p>
                  <Button variant="outline" className="w-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Property Point?
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                With over 15 years of experience in Pakistan's real estate market, Property Point has established itself as a trusted name in property development and consultation. We specialize in DHA developments and premium residential properties.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-3 mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Expert Consultation</h4>
                    <p className="text-gray-600">Professional guidance throughout your property journey</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-3 mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Premium Locations</h4>
                    <p className="text-gray-600">Exclusive access to prime DHA properties</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-3 mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Trusted Service</h4>
                    <p className="text-gray-600">Transparent dealings with complete legal documentation</p>
                  </div>
                </div>
              </div>
              <Button asChild className="mt-8 bg-gradient-orange hover:shadow-orange" size="lg">
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img 
                src="/lovable-uploads/Aboutmain.webp" 
                alt="Property Point Office"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced professionals dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <CardContent className="p-8">
                  <div className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-orange-600 font-semibold mb-1">{member.role}</p>
                  <p className="text-sm text-gray-500 mb-4">{member.experience}</p>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-orange text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Contact our expert team today and let us help you make the right investment decision
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
              <Link to="/properties">Browse Properties</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-orange-400">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <div className="flex items-center">
                <Phone className="w-6 h-6 mr-3" />
                <div>
                  <p className="font-semibold">Call Us</p>
                  <p className="text-orange-100">0321-8451083</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 mr-3" />
                <div>
                  <p className="font-semibold">Email Us</p>
                  <p className="text-orange-100">propertypointestater@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
