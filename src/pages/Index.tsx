
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Home, Users, Star, ArrowRight, Bed, Bath, Square, ShoppingCart, MessageCircle, UserCheck } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Index = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1920&h=800&fit=crop",
      title: "Find Your Perfect Dream Property",
      subtitle: "Discover the finest properties in the most desirable locations"
    },
    {
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&h=800&fit=crop",
      title: "Your Trusted Real Estate Partner",
      subtitle: "Professional guidance for all your property needs"
    },
    {
      image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=1920&h=800&fit=crop",
      title: "Luxury Living Awaits You",
      subtitle: "Exclusive properties for discerning clients"
    }
  ];

  const featuredProperties = [
    {
      id: 1,
      slug: "luxury-downtown-condo",
      title: "Luxury Downtown Condo",
      price: 850000,
      location: "Downtown, Property City",
      type: "Apartment",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      featured: true
    },
    {
      id: 2,
      slug: "suburban-family-home",
      title: "Suburban Family Home",
      price: 675000,
      location: "Oakwood Suburbs",
      type: "House",
      bedrooms: 4,
      bathrooms: 3,
      area: 2400,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
      featured: true
    },
    {
      id: 3,
      slug: "modern-loft-apartment",
      title: "Modern Loft Apartment",
      price: 520000,
      location: "Arts District",
      type: "Apartment",
      bedrooms: 1,
      bathrooms: 1,
      area: 800,
      image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=800&h=600&fit=crop",
      featured: true
    }
  ];

  const services = [
    {
      icon: <ShoppingCart className="w-12 h-12 text-orange-600" />,
      title: "Buying",
      description: "Get in touch with Property Point for buying a property and we will provide you a number of options in accordance of your budget and preferred locality. Guiding you with the most suitable choice for your needs is our top priority as we are committed to serve you with the very best."
    },
    {
      icon: <Home className="w-12 h-12 text-orange-600" />,
      title: "Selling Property",
      description: "Contact us to evaluate your property's value and we will also connect you with serious buyers upon your request. Sell your property with our assistance as we advertise it to the masses on various digital channels to make it a lot easier for you."
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-orange-600" />,
      title: "Chat us",
      description: "Either buying, selling a property or looking for an investment, proper consultation is required to take the right decision at the right time. Contact any of our highly experienced realtors for free and reliable real estate consultancy to step forward in the right direction."
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Senior Real Estate Agent",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
      experience: "8+ Years Experience"
    },
    {
      name: "Michael Chen",
      role: "Property Investment Specialist",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      experience: "12+ Years Experience"
    },
    {
      name: "Emily Rodriguez",
      role: "Luxury Property Consultant",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      experience: "10+ Years Experience"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "First-time Buyer",
      content: "Property Point made buying my first home so easy. Their team was professional and guided me through every step.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Property Investor",
      content: "I've worked with many real estate agencies, but Property Point stands out for their market knowledge and professionalism.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Home Seller",
      content: "They sold my house in just 2 weeks! Amazing service and great communication throughout the process.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Slider Section */}
      <section className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-screen">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white max-w-4xl mx-auto px-4">
                      <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        {slide.title}
                      </h1>
                      <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto mb-12">
                        {slide.subtitle}
                      </p>
                      
                      {/* Search Bar */}
                      <div className="bg-white rounded-lg shadow-xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="md:col-span-2">
                            <Input
                              placeholder="Enter location, city, or neighborhood"
                              value={searchLocation}
                              onChange={(e) => setSearchLocation(e.target.value)}
                              className="w-full"
                            />
                          </div>
                          <Select value={propertyType} onValueChange={setPropertyType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Property Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="house">House</SelectItem>
                              <SelectItem value="apartment">Apartment</SelectItem>
                              <SelectItem value="land">Land</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select value={priceRange} onValueChange={setPriceRange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Price Range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0-300000">$0 - $300K</SelectItem>
                              <SelectItem value="300000-600000">$300K - $600K</SelectItem>
                              <SelectItem value="600000-1000000">$600K - $1M</SelectItem>
                              <SelectItem value="1000000+">$1M+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button asChild className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-lg py-6">
                          <Link to="/properties">
                            <Search className="w-5 h-5 mr-2" />
                            Search Properties
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-xl transition-shadow duration-300 border-orange-100">
                <CardContent className="p-0">
                  <div className="flex justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
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
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties in the most sought-after locations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-orange-600">
                    Featured
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{property.title}</h3>
                    <span className="text-2xl font-bold text-orange-600">
                      ${property.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      <span>{property.bedrooms} bed</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      <span>{property.bathrooms} bath</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      <span>{property.area} sqft</span>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
                    <Link to={`/properties/${property.slug}`}>
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
              <Link to="/properties">
                View All Properties
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Team
            </h2>
            <p className="text-xl text-gray-600">
              Meet our experienced professionals who are dedicated to helping you find your perfect property.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-orange-100"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-orange-600 font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-500">
                    {member.experience}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-orange-200">Properties Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-orange-200">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-orange-200">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-orange-200">Expert Agents</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our satisfied clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-orange-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let our expert team help you navigate the real estate market and find the perfect property for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Link to="/properties">Browse Properties</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
