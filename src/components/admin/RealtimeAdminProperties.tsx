
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Building, Plus, Edit, Trash2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  type: string;
  status: string;
  created_at: string;
  images?: string[];
}

const RealtimeAdminProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch initial properties
    fetchProperties();

    // Set up real-time subscription
    const channel = supabase
      .channel('admin-properties-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'properties'
        },
        (payload) => {
          console.log('Real-time property change:', payload);
          
          if (payload.eventType === 'INSERT') {
            setProperties(prev => [payload.new as Property, ...prev]);
            toast({
              title: "New Property Added",
              description: `${payload.new.title} has been added to the listings.`,
            });
          } else if (payload.eventType === 'UPDATE') {
            setProperties(prev => 
              prev.map(prop => 
                prop.id === payload.new.id ? payload.new as Property : prop
              )
            );
            toast({
              title: "Property Updated",
              description: `${payload.new.title} has been updated.`,
            });
          } else if (payload.eventType === 'DELETE') {
            setProperties(prev => 
              prev.filter(prop => prop.id !== payload.old.id)
            );
            toast({
              title: "Property Deleted",
              description: "A property has been removed from the listings.",
              variant: "destructive",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
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

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Error",
        description: "Failed to delete property.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building className="w-6 h-6 text-orange-600" />
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            Real-time
          </Badge>
        </div>
        <Button asChild className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
          <Link to="/admin/properties/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Link>
        </Button>
      </div>

      {properties.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Properties Found
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Get started by adding your first property to the system.
            </p>
            <Button asChild className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
              <Link to="/admin/properties/new">
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 relative overflow-hidden">
                {property.images?.[0] ? (
                  <img 
                    src={property.images[0]} 
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building className="w-12 h-12 text-orange-400" />
                  </div>
                )}
                <Badge 
                  className={`absolute top-2 right-2 ${
                    property.status === 'active' 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : property.status === 'sold'
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-yellow-500 hover:bg-yellow-600'
                  }`}
                >
                  {property.status}
                </Badge>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold line-clamp-1">
                  {property.title}
                </CardTitle>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-orange-600 font-semibold">
                    {property.price}
                  </div>
                  <Badge variant="outline" className="border-orange-200 text-orange-700">
                    {property.type}
                  </Badge>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    asChild 
                    size="sm" 
                    className="flex-1 bg-orange-100 text-orange-700 hover:bg-orange-200"
                  >
                    <Link to={`/admin/properties/${property.id}`}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Link>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDelete(property.id, property.title)}
                    className="px-3"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RealtimeAdminProperties;
