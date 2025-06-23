
import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Building, Users, Mail, TrendingUp, Home, MessageSquare, FileText, BarChart3 } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const isMainDashboard = location.pathname === "/admin/dashboard" || location.pathname === "/admin/";

  const stats = [
    { title: "Total Properties", value: "24", icon: Building, color: "bg-blue-500" },
    { title: "Active Listings", value: "18", icon: Home, color: "bg-green-500" },
    { title: "New Messages", value: "7", icon: MessageSquare, color: "bg-purple-500" },
    { title: "Blog Posts", value: "12", icon: FileText, color: "bg-orange-500" }
  ];

  const recentActivity = [
    { action: "New property added", item: "Luxury Downtown Condo", time: "2 hours ago" },
    { action: "Message received", item: "Contact form from John Doe", time: "4 hours ago" },
    { action: "Property updated", item: "Suburban Family Home", time: "1 day ago" },
    { action: "Blog post published", item: "Market Trends 2024", time: "2 days ago" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                {isMainDashboard ? "Dashboard Overview" : "Admin Panel"}
              </h1>
              <Button
                onClick={() => {
                  localStorage.removeItem("isAdminAuthenticated");
                  navigate("/admin/login");
                }}
                variant="outline"
              >
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {isMainDashboard ? (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <div className={`p-3 rounded-full ${stat.color}`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts and Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Property Views
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Chart will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {activity.action}
                            </p>
                            <p className="text-sm text-gray-600">{activity.item}</p>
                            <p className="text-xs text-gray-400">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button 
                      onClick={() => navigate("/admin/properties/new")}
                      className="h-20 bg-blue-600 hover:bg-blue-700"
                    >
                      <div className="text-center">
                        <Building className="w-6 h-6 mx-auto mb-2" />
                        <span>Add New Property</span>
                      </div>
                    </Button>
                    <Button 
                      onClick={() => navigate("/admin/blog")}
                      variant="outline"
                      className="h-20"
                    >
                      <div className="text-center">
                        <FileText className="w-6 h-6 mx-auto mb-2" />
                        <span>Create Blog Post</span>
                      </div>
                    </Button>
                    <Button 
                      onClick={() => navigate("/admin/messages")}
                      variant="outline"
                      className="h-20"
                    >
                      <div className="text-center">
                        <MessageSquare className="w-6 h-6 mx-auto mb-2" />
                        <span>View Messages</span>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
