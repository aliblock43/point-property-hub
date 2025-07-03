
-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('house', 'apartment', 'land')),
  bedrooms INTEGER,
  bathrooms INTEGER,
  area TEXT,
  year_built INTEGER,
  description TEXT,
  amenities TEXT[], -- Array of amenities
  images TEXT[], -- Array of image URLs
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'sold', 'draft')),
  slug TEXT UNIQUE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  tags TEXT[], -- Array of tags
  slug TEXT UNIQUE,
  featured_image TEXT,
  views INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  inquiry_type TEXT DEFAULT 'general' CHECK (inquiry_type IN ('buying', 'selling', 'valuation', 'investment', 'general')),
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_properties_featured ON public.properties(featured);
CREATE INDEX idx_properties_type ON public.properties(type);
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at);
CREATE INDEX idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON public.contact_messages(created_at);

-- Enable Row Level Security (RLS) - making tables public for now since no authentication is implemented
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access (since no auth is implemented)
CREATE POLICY "Allow public read access on properties" ON public.properties FOR SELECT USING (true);
CREATE POLICY "Allow public insert on properties" ON public.properties FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on properties" ON public.properties FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on properties" ON public.properties FOR DELETE USING (true);

CREATE POLICY "Allow public read access on blog_posts" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow public insert on blog_posts" ON public.blog_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on blog_posts" ON public.blog_posts FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on blog_posts" ON public.blog_posts FOR DELETE USING (true);

CREATE POLICY "Allow public read access on contact_messages" ON public.contact_messages FOR SELECT USING (true);
CREATE POLICY "Allow public insert on contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on contact_messages" ON public.contact_messages FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on contact_messages" ON public.contact_messages FOR DELETE USING (true);

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(trim(title), '[^a-zA-Z0-9\s]', '', 'g')) || '-' || extract(epoch from now())::text;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_properties_updated_at 
  BEFORE UPDATE ON public.properties 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON public.blog_posts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO public.properties (title, price, location, type, bedrooms, bathrooms, area, description, featured, status, slug, images) VALUES
('HOUSE NO 285, BLOCK C', 700000, 'DHA Phase 6 LAHORE', 'house', 4, 5, '1 KANAL', 'Beautiful house in DHA Phase 6 with modern amenities', true, 'active', 'house-285-block-c', ARRAY['/lovable-uploads/HOUSE111.jpg']),
('HOUSE NO 1112, BLOCK D', 750000, 'DHA Phase 6 LAHORE', 'house', 4, 3, '1 KANAL', 'Spacious family home in prime location', true, 'active', 'house-1112-block-d', ARRAY['/lovable-uploads/HOUSE222.jpg']),
('HOUSE NO 123, BLOCK E', 650000, 'DHA Phase 8 LAHORE', 'house', 3, 4, '1 KANAL', 'Modern house with excellent facilities', true, 'active', 'house-123-block-e', ARRAY['/lovable-uploads/HOUSE333.jpg']);

INSERT INTO public.blog_posts (title, content, excerpt, author, status, published_at, slug) VALUES
('The Complete First-Time Home Buyer''s Guide for 2024', 'Comprehensive guide for first-time home buyers covering everything from financing to closing...', 'Everything you need to know about buying your first home...', 'Sarah Johnson', 'published', now(), 'first-time-home-buyer-guide-2024'),
('Real Estate Market Trends to Watch in 2024', 'An in-depth analysis of the current real estate market trends and predictions for 2024...', 'An in-depth analysis of the current real estate market...', 'Michael Chen', 'published', now(), 'real-estate-market-trends-2024'),
('10 Essential Tips for Selling Your Home Quickly', 'Expert advice on preparing your home for sale and attracting buyers quickly...', 'Expert advice on preparing your home for sale...', 'Emily Rodriguez', 'draft', null, '10-tips-selling-home-quickly');
