
-- Enable realtime for properties table
ALTER TABLE public.properties REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.properties;

-- Enable realtime for blog_posts table  
ALTER TABLE public.blog_posts REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_posts;

-- Enable realtime for contact_messages table
ALTER TABLE public.contact_messages REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_messages;

-- Create storage buckets for property images and blog images
INSERT INTO storage.buckets (id, name, public) VALUES 
('property-images', 'property-images', true),
('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for property images bucket
CREATE POLICY "Public can view property images" ON storage.objects
FOR SELECT USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can upload property images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can update property images" ON storage.objects
FOR UPDATE USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can delete property images" ON storage.objects
FOR DELETE USING (bucket_id = 'property-images');

-- Create storage policies for blog images bucket
CREATE POLICY "Public can view blog images" ON storage.objects
FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can update blog images" ON storage.objects
FOR UPDATE USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can delete blog images" ON storage.objects
FOR DELETE USING (bucket_id = 'blog-images');

-- Update blog_posts table to ensure proper slug generation
CREATE OR REPLACE FUNCTION generate_blog_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(trim(title), '[^a-zA-Z0-9\s]', '', 'g')) || '-' || extract(epoch from now())::text;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to auto-generate slug for blog posts if not provided
CREATE OR REPLACE FUNCTION auto_generate_blog_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_blog_slug(NEW.title);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_blog_slug_trigger
  BEFORE INSERT OR UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION auto_generate_blog_slug();

-- Add trigger to auto-generate slug for properties if not provided
CREATE OR REPLACE FUNCTION auto_generate_property_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := lower(regexp_replace(trim(NEW.title), '[^a-zA-Z0-9\s]', '', 'g')) || '-' || extract(epoch from now())::text;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_property_slug_trigger
  BEFORE INSERT OR UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION auto_generate_property_slug();
