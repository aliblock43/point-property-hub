
import { Link, useLocation } from "react-router-dom";
import { Building, Home, MessageSquare, FileText, BarChart3, Settings } from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path) ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100";
  };

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/admin/properties", label: "Properties", icon: Building },
    { path: "/admin/blog", label: "Blog Posts", icon: FileText },
    { path: "/admin/messages", label: "Messages", icon: MessageSquare },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Property Point</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">Admin Panel</p>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path)}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
