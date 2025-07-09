
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Home, Users, Star, ArrowRight, Bed, Bath, Square, ShoppingCart, MessageCircle, UserCheck, Play, Award, TrendingUp, Users2, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [certificateApi, setCertificateApi] = useState<CarouselApi>();
  const [currentCertificate, setCurrentCertificate] = useState(0);
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);

  const heroSlides = [{
    image: "/lovable-uploads/cb32ebe6-7718-461f-af6f-2cbbaaed8ee1.webp",
    title: "DHA LAHORE PLOTS, FILES, COMMERCIAL PROPERTIES",
    subtitle: "Discover the finest properties in the most desirable locations with our expert guidance",
    cta: "Explore Properties"
  }, {
    image: "/lovable-uploads/579a50ca-0240-45a7-a77c-d35e4681f608.webp",
    title: "DHA MULTAN PLOTS, FILES, COMMERCIAL PROPERTIES",
    subtitle: "Professional guidance and personalized service for all your property investment needs",
    cta: "Get Started"
  }, {
    image: "/lovable-uploads/020a0812-ed93-4c22-886e-f67381c856dd.webp",
    title: "DHA QUETTA PLOTS, FILES, COMMERCIAL PROPERTIES",
    subtitle: "Exclusive properties and premium locations for discerning clients who demand excellence",
    cta: "View Luxury Properties"
  }];

  // Fetch featured properties from database
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('featured', true)
          .eq('status', 'active')
          .limit(3)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching featured properties:', error);
          return;
        }

        setFeaturedProperties(data || []);
      } catch (error) {
        console.error('Error fetching featured properties:', error);
      }
    };

    fetchFeaturedProperties();
  }, []);

  // Auto-play functionality for hero slider
  useEffect(() => {
    if (!api) {
      return;
    }
    const autoPlay = setInterval(() => {
      api.scrollNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(autoPlay);
  }, [api]);

  // Track current slide
  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Certificate carousel tracking
  useEffect(() => {
    if (!certificateApi) {
      return;
    }
    setCurrentCertificate(certificateApi.selectedScrollSnap());
    certificateApi.on("select", () => {
      setCurrentCertificate(certificateApi.selectedScrollSnap());
    });
  }, [certificateApi]);

  const services = [
    {
      icon: <ShoppingCart className="w-12 h-12 text-orange-600" />,
      title: "Buying",
      description: "Get in touch with Property Point for buying a property and we will provide you a number of options in accordance of your budget and preferred locality. Guiding you with the most suitable choice for your needs is our top priority as we are committed to serve you with the very best."
    }, {
      icon: <Home className="w-12 h-12 text-orange-600" />,
      title: "Selling Property",
      description: "Contact us to evaluate your property's value and we will also connect you with serious buyers upon your request. Sell your property with our assistance as we advertise it to the masses on various digital channels to make it a lot easier for you."
    }, {
      icon: <MessageCircle className="w-12 h-12 text-orange-600" />,
      title: "Chat us",
      description: "Either buying, selling a property or looking for an investment, proper consultation is required to take the right decision at the right time. Contact any of our highly experienced realtors for free and reliable real estate consultancy to step forward in the right direction."
    }];
  const teamMembers = [{
    name: "Umer Shahid",
    role: "Chief Executive Officer",
    image: "/lovable-uploads/79a7b6f3-488f-4fbb-ad38-210fc36d9e79.webp",
    experience: "12+ Years Experience",
    specialization: "Luxury Properties",
    sales: "500+ Properties Sold",
    rating: 4.9
  }, {
    name: "Adil Ilyas",
    role: "Director of Sales and Business Development",
    image: "/lovable-uploads/66a0b920-d4f1-4ef2-966f-5aa6ea4646b1.webp",
    experience: "6+ Years Experience",
    specialization: "Investment Properties",
    sales: "750+ Properties Sold",
    rating: 4.8
  }, {
    name: "Shahid Iqbal Zia",
    role: "Managing Director",
    image: "/lovable-uploads/41a5aed2-441a-448a-98fa-048950a6b441.webp",
    experience: "8+ Years Experience",
    specialization: "Commercial Real Estate",
    sales: "650+ Properties Sold",
    rating: 4.9
  }];
  
  // Updated testimonials with new names
  const testimonials = [
    {
      name: "Main Sami",
      role: "First-time Buyer",
      content: "Property Point made buying my first home so easy. Their team was professional and guided me through every step.",
      rating: 5
    }, {
      name: "Ikram CH",
      role: "Property Investor",
      content: "I've worked with many real estate agencies, but Property Point stands out for their market knowledge and professionalism.",
      rating: 5
    }, {
      name: "Maira Khan",
      role: "Home Seller",
      content: "They sold my house in just 2 weeks! Amazing service and great communication throughout the process.",
      rating: 5
    }];
    
  const certificates = [
    {
      id: 1,
      title: "DHA Lahore Estate Agents Registration",
      image: "/lovable-uploads/a75d35e2-67d9-4162-a3f8-4e7e9e6d7853.webp",
      description: "Authorized Real Estate Agent Registration Certificate"
    },
    {
      id: 2,
      title: "Real Estate Agent License",
      image: "/lovable-uploads/82bb2716-350f-450f-adce-cf8300678832.webp",
      description: "Provincial Real Estate Agent Registration"
    },
    {
      id: 3,
      title: "Taxpayer Registration Certificate",
      image: "/lovable-uploads/8595a21e-2b56-447b-b07f-974ef914e284.webp",
      description: "Federal Board of Revenue Registration"
    }
  ];

  return <div className="min-h-screen">
      {/* Enhanced Auto-Moving Hero Slider Section */}
      <section className="relative">
        <Carousel className="w-full" opts={{
        loop: true
      }} setApi={setApi}>
          <CarouselContent>
            {heroSlides.map((slide, index) => <CarouselItem key={index}>
                <div className="relative h-screen">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover" 
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  {/* Enhanced overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
                  
                  {/* Hero Content */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="max-w-4xl">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
                          {slide.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed animate-fade-in">
                          {slide.subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
                          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-4 h-auto transition-all duration-300 hover:scale-105">
                            <Link to="/properties">
                              {slide.cta}
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                          </Button>
                          <Button asChild variant="outline" size="lg" className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white text-lg px-8 py-4 h-auto transition-all duration-300">
                            <Link to="/contact">
                              Contact Us
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slide indicators */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="flex space-x-3">
                      {heroSlides.map((_, slideIndex) => <button key={slideIndex} onClick={() => api?.scrollTo(slideIndex)} className={`w-3 h-3 rounded-full transition-all duration-300 ${slideIndex === current ? 'bg-orange-600 w-8' : 'bg-white/50 hover:bg-white/70'}`} />)}
                    </div>
                  </div>
                </div>
              </CarouselItem>)}
          </CarouselContent>
        </Carousel>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive real estate solutions tailored to your unique needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service, index) => <Card key={index} className="p-8 text-center hover:shadow-2xl transition-all duration-300 border-orange-100 hover:border-orange-200 group transform hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="flex justify-center mb-8">
                    <div className="p-4 bg-orange-50 rounded-full group-hover:bg-orange-100 transition-colors duration-300">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {service.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* New Updates Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                New Updates
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">Congratulations to everyone DHA Announced a possession in phase 8 S, T, U, V, W and Y Blocks except X and Y2. Possession Ceremony was held in DHA Lahore Phase 8, W Block. It is the biggest sign to buy plots in DHA phase 8 and the reason that its price are expected to go upwards. We are highly recommended to buy plots in DHA Lahore phase 8. DHA Lahore phase 8 X Block and Y2 Block possession announced within 6 months. Once again Congratulations to everyone phase 8 possession officially announced by DHA Lahore.</p>
              <Button asChild className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-4 h-auto">
                <Link to="/blog">
                  Read More Updates
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Right side - YouTube video */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
                <div className="aspect-video">
                  <iframe src="https://www.youtube.com/embed/6V4fvoLttp0" title="Property Point Updates" className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                </div>
                {/* Play button overlay - optional decorative element */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-white/20 rounded-full p-4">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-200 rounded-full opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-100 rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of premium properties in the most sought-after locations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.length > 0 ? featuredProperties.map(property => <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={property.images?.[0] || '/placeholder.svg'} 
                    alt={property.title} 
                    className="w-full h-64 object-cover" 
                    loading="lazy"
                    decoding="async"
                  />
                  <Badge className="absolute top-4 left-4 bg-orange-600 hover:bg-orange-700">
                    Featured
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{property.title}</h3>
                    <span className="text-2xl font-bold text-orange-600">
                      PKR {property.price?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    {property.bedrooms && (
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span>{property.bedrooms} bed</span>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span>{property.bathrooms} bath</span>
                      </div>
                    )}
                    {property.area && (
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        <span>{property.area}</span>
                      </div>
                    )}
                  </div>
                  <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
                    <Link to={`/properties/${property.slug}`}>
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>) : (
                // Fallback to show loading or no properties message
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">Loading featured properties...</p>
                </div>
              )}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white text-lg px-8 py-4 h-auto">
              <Link to="/properties">
                View All Properties
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Redesigned Our Team Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our dedicated professionals bring years of experience and deep market knowledge to help you achieve your real estate goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => <div key={index} className="group">
                <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white border-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-orange-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="p-0 relative">
                    {/* Image Section */}
                    <div className="relative overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" 
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Rating Badge */}
                      <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        {member.rating}
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-orange-600 font-semibold text-lg mb-4">
                        {member.role}
                      </p>
                      
                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <div className="flex items-center justify-center mb-2">
                            <Award className="w-5 h-5 text-orange-600" />
                          </div>
                          <p className="text-sm font-semibold text-gray-700">{member.experience}</p>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <div className="flex items-center justify-center mb-2">
                            <TrendingUp className="w-5 h-5 text-orange-600" />
                          </div>
                          <p className="text-sm font-semibold text-gray-700">{member.sales}</p>
                        </div>
                      </div>
                      
                      {/* Specialization */}
                      <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-1">Specialization</p>
                        <p className="font-semibold text-gray-800">{member.specialization}</p>
                      </div>
                      
                      {/* Contact Button */}
                      <Button className="w-full bg-orange-600 hover:bg-orange-700 transform transition-all duration-300 group-hover:scale-105">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contact {member.name.split(' ')[0]}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>)}
          </div>
          
          {/* Team CTA */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100">
              <div className="flex items-center justify-center mb-4">
                <Users2 className="w-12 h-12 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Work with Our Team?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our experienced professionals are here to guide you through every step of your real estate journey.
              </p>
              <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-4 h-auto">
                <Link to="/contact">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Information */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Certifications & Awards
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Property Point has been recognized for excellence in real estate services. Our certifications and awards demonstrate our commitment to providing the highest quality service to our clients and maintaining professional standards in the industry.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <Award className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Professional Excellence</h3>
                    <p className="text-gray-600">Certified by leading real estate organizations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Industry Recognition</h3>
                    <p className="text-gray-600">Award-winning service and customer satisfaction</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Market Leadership</h3>
                    <p className="text-gray-600">Leading performance in local real estate market</p>
                  </div>
                </div>
              </div>
              <Button asChild className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-4 h-auto">
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Right side - Certificate Carousel */}
            <div className="relative">
              <Carousel className="w-full max-w-md mx-auto" setApi={setCertificateApi}>
                <CarouselContent>
                  {certificates.map((certificate) => (
                    <CarouselItem key={certificate.id}>
                      <Card className="border-0 shadow-2xl overflow-hidden bg-white">
                        <CardContent className="p-0">
                          <div className="relative">
                            <img
                              src={certificate.image}
                              alt={certificate.title}
                              className="w-full h-[500px] object-contain bg-white p-4"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                              <h3 className="text-xl font-bold mb-2">{certificate.title}</h3>
                              <p className="text-gray-200">{certificate.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                {/* Custom Navigation Buttons */}
                <button
                  onClick={() => certificateApi?.scrollPrev()}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-orange-600 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => certificateApi?.scrollNext()}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-orange-600 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </Carousel>

              {/* Certificate indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {certificates.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => certificateApi?.scrollTo(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentCertificate 
                        ? 'bg-orange-600 w-8' 
                        : 'bg-orange-200 hover:bg-orange-300'
                    }`}
                  />
                ))}
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-200 rounded-full opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-100 rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold mb-4">500+</div>
              <div className="text-orange-200 text-lg">Properties Sold</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold mb-4">1000+</div>
              <div className="text-orange-200 text-lg">Happy Clients</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold mb-4">15+</div>
              <div className="text-orange-200 text-lg">Years Experience</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold mb-4">50+</div>
              <div className="text-orange-200 text-lg">Expert Agents</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our satisfied clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-orange-100">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-orange-400 fill-current" />)}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-orange-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Let our expert team help you navigate the real estate market and find the perfect property for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-lg px-8 py-4 h-auto transform transition-all duration-300 hover:scale-105">
              <Link to="/properties">Browse Properties</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white text-orange-600 border-white hover:bg-orange-600 hover:text-white text-lg px-8 py-4 h-auto transition-all duration-300">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>;
};

export default Index;
