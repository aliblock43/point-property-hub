import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Users, Award, Home, MapPin, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    {
      name: "Umer Shahid",
      role: "Chief Executive Officer",
      experience: "12+ years",
      specialties: ["Luxury Properties", "Property Investment"],
      image: "/lovable-uploads/41a5aed2-441a-448a-98fa-048950a6b441.png"
    },
    {
      name: "Adil Ilyas",
      role: "Director of Sales and Business Development",
      experience: "6+ years",
      specialties: ["Investment Properties", "Business Development"],
      image: "/lovable-uploads/79a7b6f3-488f-4fbb-ad38-210fc36d9e79.png"
    },
    {
      name: "Shahid Iqbal Zia",
      role: "Managing Director",
      experience: "8+ years",
      specialties: ["Commercial Real Estate", "Property Management"],
      image: "/lovable-uploads/66a0b920-d4f1-4ef2-966f-5aa6ea4646b1.png"
    },
    {
      name: "David Thompson",
      role: "Commercial Real Estate Specialist",
      experience: "12+ years",
      specialties: ["Office Buildings", "Retail Spaces"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Jessica Williams",
      role: "Luxury Home Consultant",
      experience: "7+ years",
      specialties: ["Luxury Estates", "High-end Properties"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b332446c?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Robert Martinez",
      role: "Property Development Advisor",
      experience: "15+ years",
      specialties: ["New Developments", "Land Acquisition"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Lisa Anderson",
      role: "Residential Sales Manager",
      experience: "9+ years",
      specialties: ["Family Homes", "Relocation Services"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    }
  ];

  const values = [
    {
      icon: Users,
      title: "Client-Centered Approach",
      description: "We put our clients' needs first, providing personalized service and expert guidance throughout every step of the real estate process."
    },
    {
      icon: Award,
      title: "Professional Excellence",
      description: "Our team maintains the highest standards of professionalism, continuously updating our knowledge and skills to serve you better."
    },
    {
      icon: Home,
      title: "Market Expertise",
      description: "With deep knowledge of local markets, we provide accurate valuations and strategic advice to help you make informed decisions."
    },
    {
      icon: MapPin,
      title: "Community Focus",
      description: "We're committed to our local communities, understanding neighborhood dynamics and helping you find the perfect location."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Property Point
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
              Your trusted partner in real estate for over 15 years. We're committed to helping you find your perfect property and achieve your real estate goals.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  Welcome to Property Point. You have joined an organization that is committed to excellence in providing real estate and effective solutions to the Real Estate Sector. Our emphasis on teamwork encourages cooperative decision-making among employees and management. CE actively seeks to create a positive work environment in which every employee can realize his or her full potential and also work towards convergence of personal goals and company objectives. No business is free from day-to-day problems, but we believe our personnel policies and practices will help resolve such problems. All of us must work together to make the company a viable, healthy, and profitable organization. This is the only way we can provide a satisfactory working environment that promotes genuine concern and respect for others including all employees and our customers.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop"
                alt="Property Point Office"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm">Properties Sold</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're guided by core values that shape everything we do, from client interactions to community involvement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600">
              Our experienced agents are here to guide you through every step of your real estate journey.
            </p>
          </div>

          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {teamMembers.map((member, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-orange-600 font-medium mb-2">{member.role}</p>
                      <div className="flex items-center mb-3">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm text-gray-600">{member.experience} experience</span>
                      </div>
                      <div className="space-y-1">
                        {member.specialties.map((specialty, i) => (
                          <Badge key={i} variant="outline" className="mr-1 mb-1">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-12 h-12 mx-auto mb-6 text-orange-200" />
          <blockquote className="text-2xl md:text-3xl font-medium mb-6">
            "Property Point helped us find our dream home in just three weeks. Their team was professional, knowledgeable, and always available to answer our questions. We couldn't be happier with our experience!"
          </blockquote>
          <cite className="text-orange-200">
            - Jennifer and Mark Thompson, Happy Homeowners
          </cite>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">15+</div>
              <div className="text-gray-600">Years in Business</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600">Properties Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">1000+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600">Expert Agents</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Work with Us?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let our experienced team help you find your perfect property or sell your current one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Link to="/properties">Browse Properties</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
