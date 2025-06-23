
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, ArrowLeft, Share, Heart } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();

  // Mock blog post data - in real app, fetch based on slug
  const post = {
    id: 1,
    slug: "first-time-home-buyer-guide",
    title: "The Complete First-Time Home Buyer's Guide for 2024",
    excerpt: "Everything you need to know about buying your first home, from saving for a down payment to closing day.",
    content: `
      <p>Buying your first home is an exciting milestone, but it can also feel overwhelming. With so many steps involved and important decisions to make, it's crucial to be well-prepared. This comprehensive guide will walk you through everything you need to know about purchasing your first home in 2024.</p>

      <h2>1. Assess Your Financial Readiness</h2>
      <p>Before you start looking at homes, it's essential to understand your financial situation. Calculate your debt-to-income ratio, check your credit score, and determine how much you can afford to spend on a home.</p>

      <h3>Key Financial Considerations:</h3>
      <ul>
        <li>Credit score (aim for 620 or higher)</li>
        <li>Down payment (typically 3-20% of home price)</li>
        <li>Monthly income and expenses</li>
        <li>Emergency fund for unexpected costs</li>
      </ul>

      <h2>2. Get Pre-approved for a Mortgage</h2>
      <p>Getting pre-approved shows sellers you're a serious buyer and helps you understand your budget. Shop around with different lenders to find the best rates and terms.</p>

      <h2>3. Find the Right Real Estate Agent</h2>
      <p>A good real estate agent will be your guide throughout the home buying process. Look for someone with experience in your target area and good reviews from past clients.</p>

      <h2>4. Start House Hunting</h2>
      <p>Now comes the fun part! Create a list of must-haves versus nice-to-haves, and be prepared to act quickly in competitive markets.</p>

      <h2>5. Make an Offer and Negotiate</h2>
      <p>When you find the right home, your agent will help you make a competitive offer. Be prepared for counteroffers and negotiations.</p>

      <h2>6. Home Inspection and Appraisal</h2>
      <p>Once your offer is accepted, you'll need to get a home inspection and appraisal. These protect you from costly surprises and ensure you're paying a fair price.</p>

      <h2>7. Closing Day</h2>
      <p>The final step is closing on your home. You'll sign paperwork, transfer funds, and receive your keys. Congratulations – you're now a homeowner!</p>

      <p>Remember, buying a home is a marathon, not a sprint. Take your time, ask questions, and don't hesitate to seek professional advice throughout the process.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1200&h=600&fit=crop",
    author: "Sarah Johnson",
    publishDate: "2024-01-15",
    tags: ["First-time Buyers", "Home Buying", "Real Estate Tips"],
    readTime: "8 min read"
  };

  const relatedPosts = [
    {
      id: 2,
      slug: "real-estate-market-trends-2024",
      title: "Real Estate Market Trends to Watch in 2024",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      slug: "selling-your-home-tips",
      title: "10 Essential Tips for Selling Your Home Quickly",
      image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=400&h=200&fit=crop"
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button asChild variant="outline" className="mb-8">
          <Link to="/blog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </Button>

        {/* Article Header */}
        <Card className="overflow-hidden mb-8">
          <div className="aspect-video overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-8">
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center text-gray-600">
                <User className="w-5 h-5 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{formatDate(post.publishDate)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between mb-8">
              <p className="text-lg text-gray-600">
                {post.excerpt}
              </p>
              <div className="flex space-x-2 ml-4">
                <Button size="sm" variant="outline">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Article Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                lineHeight: '1.8',
              }}
            />
          </CardContent>
        </Card>

        {/* Author Bio */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">About {post.author}</h3>
                <p className="text-gray-600">
                  Senior Real Estate Agent with over 10 years of experience helping families find their perfect homes. 
                  Specializes in first-time home buyers and luxury properties.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/blog/${relatedPost.slug}`}>
                      Read More
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
