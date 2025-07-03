import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      slug: "first-time-home-buyer-guide",
      title: "The Complete First-Time Home Buyer's Guide for 2024",
      excerpt: "Everything you need to know about buying your first home, from saving for a down payment to closing day.",
      content: "Buying your first home is an exciting milestone, but it can also feel overwhelming...",
      coverImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=400&fit=crop",
      author: "Sarah Johnson",
      publishDate: "2024-01-15",
      tags: ["First-time Buyers", "Home Buying", "Real Estate Tips"],
      readTime: "8 min read"
    },
    {
      id: 2,
      slug: "real-estate-market-trends-2024",
      title: "Real Estate Market Trends to Watch in 2024",
      excerpt: "An in-depth analysis of the current real estate market and predictions for the coming year.",
      content: "The real estate market continues to evolve, with several key trends shaping the landscape...",
      coverImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=400&fit=crop",
      author: "Michael Chen",
      publishDate: "2024-01-10",
      tags: ["Market Analysis", "Investment", "Real Estate Trends"],
      readTime: "6 min read"
    },
    {
      id: 3,
      slug: "selling-your-home-tips",
      title: "10 Essential Tips for Selling Your Home Quickly",
      excerpt: "Expert advice on preparing your home for sale and attracting serious buyers in today's market.",
      content: "Selling your home can be a complex process, but with the right preparation and strategy...",
      coverImage: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=800&h=400&fit=crop",
      author: "Emily Rodriguez",
      publishDate: "2024-01-05",
      tags: ["Home Selling", "Real Estate Tips", "Property Staging"],
      readTime: "5 min read"
    }
  ];

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Real Estate Blog
          </h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Stay informed with the latest real estate insights, market trends, and expert advice from our team.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Post */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Article</h2>
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-1" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{formatDate(featuredPost.publishDate)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredPost.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button asChild className="bg-orange-600 hover:bg-orange-700">
                  <Link to={`/blog/${featuredPost.slug}`}>
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(post.publishDate)}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <Button asChild variant="outline">
                      <Link to={`/blog/${post.slug}`}>
                        Read More
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card className="bg-orange-600 text-white p-8">
            <CardContent className="p-0 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Stay Updated with Real Estate Insights
              </h3>
              <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter to receive the latest market updates, buying and selling tips, and exclusive property listings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-orange-300"
                />
                <Button className="bg-white text-orange-600 hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Blog;
