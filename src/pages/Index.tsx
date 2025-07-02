import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'

const images = [
  "/lovable-uploads/slider-1.jpg",
  "/lovable-uploads/slider-2.jpg",
  "/lovable-uploads/slider-3.jpg",
  "/lovable-uploads/slider-4.jpg",
  "/lovable-uploads/slider-5.jpg",
];

const testimonials = [
  {
    name: "Alice Johnson",
    title: "Happy Homeowner",
    comment: "Thanks to Lovable Properties, I found my dream home in just a few weeks! Their team was incredibly helpful and responsive.",
    image: "/lovable-uploads/test-1.jpg",
  },
  {
    name: "Bob Williams",
    title: "Real Estate Investor",
    comment: "Lovable Properties provided me with excellent investment opportunities. Their market knowledge and negotiation skills are top-notch.",
    image: "/lovable-uploads/test-2.jpg",
  },
  {
    name: "Charlie Brown",
    title: "First-Time Buyer",
    comment: "I was nervous about buying my first property, but Lovable Properties made the process smooth and easy. I highly recommend them!",
    image:"/lovable-uploads/test-3.jpg",
  },
];

export default function Index() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, [images.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slider */}
      <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full max-w-full relative"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="-ml-1 md:ml-0">
            {images.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/1">
                <div className="p-1 md:p-0">
                  <img
                    src={image}
                    alt={`Real Estate Slide ${index + 1}`}
                    className="object-cover w-full h-[70vh] md:h-[85vh]"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                      Discover Your Dream Property
                    </h1>
                    <p className="text-lg md:text-xl mb-8">
                      We offer a wide range of properties to suit every need and budget.
                    </p>
                    <Button size="lg">
                      Explore Properties <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 top-1/2 transform -translate-y-1/2 z-20" />
          <CarouselNext className="right-4 top-1/2 transform -translate-y-1/2 z-20" />
        </Carousel>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive real estate services to help you buy, sell, or rent properties with ease.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Property Sales</h3>
              <p className="text-gray-600">
                We assist you in selling your property at the best possible price, with expert marketing and negotiation strategies.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Property Rentals</h3>
              <p className="text-gray-600">
                Find the perfect rental property with our extensive listings and dedicated support. We make renting easy and stress-free.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Property Management</h3>
              <p className="text-gray-600">
                Our property management services ensure your investment is well-maintained and generates consistent income.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our experienced real estate professionals are here to help you navigate the property market
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Agent 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <img
                src="/src/assets/images/shahid-iqbal-zia.png"
                alt="Shahid Iqbal Zia"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Shahid Iqbal Zia</h3>
              <p className="text-orange-600 mb-3">Senior Real Estate Agent</p>
              <p className="text-gray-600 text-sm">
                With over 10 years of experience in luxury properties and commercial real estate.
              </p>
            </div>

            {/* Agent 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <img
                src="/src/assets/images/umer-shahid.png"
                alt="Umer Shahid"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Umer Shahid</h3>
              <p className="text-orange-600 mb-3">Property Investment Specialist</p>
              <p className="text-gray-600 text-sm">
                Expert in residential properties and investment opportunities with proven track record.
              </p>
            </div>

            {/* Agent 3 - Added padding-top */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 pt-12">
              <img
                src="/src/assets/images/adil-ilyas.png"
                alt="Adil Ilyas"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Adil Ilyas</h3>
              <p className="text-orange-600 mb-3">Commercial Real Estate Expert</p>
              <p className="text-gray-600 text-sm">
                Specializes in commercial properties and business real estate solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Read what our satisfied clients have to say about their experience with Lovable Properties.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{testimonial.name}</h4>
                <p className="text-orange-600 mb-3">{testimonial.title}</p>
                <p className="text-gray-600 italic text-sm">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500 to-orange-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-xl mb-8">
            Contact us today to start your real estate journey with Lovable Properties.
          </p>
          <Button size="lg" variant="secondary">
            Contact Us <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
