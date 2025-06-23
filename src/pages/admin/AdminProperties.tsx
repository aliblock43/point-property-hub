
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, Eye, MapPin } from "lucide-react";

const AdminProperties = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const properties = [
    {
      id: 1,
      title: "Luxury Downtown Condo",
      price: 850000,
      location: "Downtown, Property City",
      type: "Apartment",
      status: "Active",
      featured: true,
      views: 245,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Suburban Family Home",
      price: 675000,
      location: "Oakwood Suburbs",
      type: "House",
      status: "Active",
      featured: true,
      views: 189,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Modern Loft Apartment",
      price: 520000,
      location: "Arts District",
      type: "Apartment",
      status: "Sold",
      featured: false,
      views: 312,
      image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=300&h=200&fit=crop"
    }
  ];

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this property?")) {
      console.log("Delete property:", id);
      // Handle deletion
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Properties</h1>
          <p className="text-gray-600">Add, edit, and manage your property listings</p>
        </div>
        <Button asChild className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700">
          <Link to="/admin/properties/new">
            <Plus className="w-4 h-4 mr-2" />
            Add New Property
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">All Status</Button>
              <Button variant="outline">Filter</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Properties List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              {property.featured && (
                <Badge className="absolute top-2 left-2 bg-blue-600">
                  Featured
                </Badge>
              )}
              <Badge 
                className={`absolute top-2 right-2 ${
                  property.status === 'Active' ? 'bg-green-600' : 
                  property.status === 'Sold' ? 'bg-gray-600' : 'bg-yellow-600'
                }`}
              >
                {property.status}
              </Badge>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                {property.title}
              </h3>
              
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm line-clamp-1">{property.location}</span>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-blue-600">
                  ${property.price.toLocaleString()}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{property.views} views</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button asChild size="sm" variant="outline" className="flex-1">
                  <Link to={`/admin/properties/${property.id}`}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Link>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleDelete(property.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Building className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first property.'}
            </p>
            {!searchTerm && (
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to="/admin/properties/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Property
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminProperties;
