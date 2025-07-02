
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Square, Filter, Search } from "lucide-react";

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const properties = [
    {
      id: 1,
      // slug: "luxury-downtown-condo",
      title: "HOUSE NO 285, BLOCK C",
      price: 7,
      location: "DHA Phase 6 LAHORE",
      type: "HOUSE",
      bedrooms: 4,
      bathrooms: 5,
      area: "1 KANAL",
      image: "/lovable-uploads/HOUSE111.jpg",
      featured: true
    },
    {
      id: 2,
      // slug: "suburban-family-home",
      title: "HOUSE NO 1112, BLOCK D",
      price: 7,
      location: "DHA Phase 6 LAHORE",
      type: "HOUSE",
      bedrooms: 4,
      bathrooms: 3,
      area: "1 KANAL",
      image: "/lovable-uploads/HOUSE222.jpg",
      featured: true
    },
    {
      id: 3,
      // slug: "modern-loft-apartment",
      title: "HOUSE NO 123, BLOCK E",
      price: 6,
      location: "DHA Phase 8 LAHORE",
      type: "HOUSE",
      bedrooms: 3,
      bathrooms: 4,
      area: "1 KANAL",
      image: "/lovable-uploads/HOUSE333.jpg",
      featured: true
    },
    {
      id: 3,
      // slug: "modern-loft-apartment",
      title: "HOUSE NO 123, BLOCK E",
      price: 6,
      location: "DHA Phase 8 LAHORE",
      type: "HOUSE",
      bedrooms: 3,
      bathrooms: 4,
      area: "1 KANAL",
      image: "/lovable-uploads/HOUSE333.jpg",
      featured: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Properties for Sale</h1>
          <p className="text-lg text-gray-600">
            Discover your perfect property from our extensive collection of homes and apartments.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Location
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Enter location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <Select value={filterPrice} onValueChange={setFilterPrice}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Price</SelectItem>
                      <SelectItem value="0-300000">$0 - $300K</SelectItem>
                      <SelectItem value="300000-600000">$300K - $600K</SelectItem>
                      <SelectItem value="600000-1000000">$600K - $1M</SelectItem>
                      <SelectItem value="1000000+">$1M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterType("");
                    setFilterPrice("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          </div>

          {/* Properties Grid */}
          <div className="flex-1">
            {/* Sort and Results Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <p className="text-gray-600 mb-4 sm:mb-0">
                Showing {properties.length} properties
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="area">Area: Largest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-64 object-cover"
                    />
                    {property.featured && (
                      <Badge className="absolute top-4 left-4 bg-blue-600">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                        {property.title}
                      </h3>
                      <span className="text-xl font-bold text-blue-600 whitespace-nowrap ml-2">
                        ${property.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="line-clamp-1">{property.location}</span>
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
                    <Button asChild className="w-full">
                      <Link to={`/properties/${property.slug}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <Button variant="outline" disabled>Previous</Button>
                <Button className="bg-blue-600">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
