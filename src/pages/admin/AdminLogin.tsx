
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Lock, Mail } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("propertypoint143");
  const [password, setPassword] = useState("DNA69");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock authentication - in real app, validate against backend
    setTimeout(() => {
      if (email === "propertypoint143" && password === "DNA69") {
        localStorage.setItem("isAdminAuthenticated", "true");
        navigate("/admin/dashboard");
      } else {
        alert("Invalid credentials. Please check your email and password.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-orange hover-lift">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-orange rounded-full flex items-center justify-center shadow-orange">
            <Building className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gradient-orange">Property Point Admin</CardTitle>
          <p className="text-gray-600">Sign in to access the admin dashboard</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-12 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-12 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-orange hover:bg-gradient-to-r hover:from-orange-600 hover:to-orange-700 shadow-orange"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
