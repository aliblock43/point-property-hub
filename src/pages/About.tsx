
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Home, MapPin, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Senior Real Estate Agent",
      experience: "10+ years",
      specialties: ["Luxury Properties", "First-time Buyers"],
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Property Investment Consultant",
      experience: "8+ years",
      specialties: ["Investment Properties", "Commercial Real Estate"],
      image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Real Estate Agent",
      experience: "5+ years",
      specialties: ["Residential Sales", "Property Management"],
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop&crop=face"
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
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Property Point
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
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
                  Founded in 2009, Property Point began as a small family-owned real estate agency with a simple mission: to provide exceptional service and help people find their dream homes. Over the years, we've grown into one of the most trusted real estate companies in the region.
                </p>
                <p>
                  Our success is built on strong relationships, deep market knowledge, and an unwavering commitment to our clients' satisfaction. We believe that buying or selling a property is more than just a transaction – it's a life-changing experience that deserves personal attention and professional expertise.
                </p>
                <p>
                  Today, we're proud to serve thousands of satisfied clients, having helped them navigate complex real estate decisions and achieve their property goals. Our team of experienced agents combines local market insights with innovative technology to deliver results that exceed expectations.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop"
                alt="Property Point Office"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg shadow-lg">
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
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-blue-600" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
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
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote className="w-12 h-12 mx-auto mb-6 text-blue-200" />
          <blockquote className="text-2xl md:text-3xl font-medium mb-6">
            "Property Point helped us find our dream home in just three weeks. Their team was professional, knowledgeable, and always available to answer our questions. We couldn't be happier with our experience!"
          </blockquote>
          <cite className="text-blue-200">
            - Jennifer and Mark Thompson, Happy Homeowners
          </cite>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">Years in Business</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Properties Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
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
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
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
