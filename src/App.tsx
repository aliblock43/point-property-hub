
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from "./components/Layout";
import { useScrollToTop } from "./hooks/useScrollToTop";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Profile from "./pages/Profile";
import Maps from "./pages/Maps";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminPropertyForm from "./pages/admin/AdminPropertyForm";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminBlogForm from "./pages/admin/AdminBlogForm";
import AdminMessages from "./pages/admin/AdminMessages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const LayoutWrapper = () => {
  useScrollToTop();
  
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LayoutWrapper />}>
              <Route index element={<Index />} />
              <Route path="properties" element={<Properties />} />
              <Route path="properties/:slug" element={<PropertyDetail />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="profile" element={<Profile />} />
              <Route path="maps" element={<Maps />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="admin/*" element={<AdminDashboard />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="properties" element={<AdminProperties />} />
              <Route path="properties/new" element={<AdminPropertyForm />} />
              <Route path="properties/:id" element={<AdminPropertyForm />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="blog/new" element={<AdminBlogForm />} />
              <Route path="blog/:id" element={<AdminBlogForm />} />
              <Route path="messages" element={<AdminMessages />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
