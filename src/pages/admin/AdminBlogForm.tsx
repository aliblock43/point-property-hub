import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, X, Plus, Upload, Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminBlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    status: "draft",
    featured_image: ""
  });

  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchBlogPost();
    }
  }, [isEditing, id]);

  const fetchBlogPost = async () => {
    if (!id) return;
    
    setFetchLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setFormData({
        title: data.title || "",
        content: data.content || "",
        excerpt: data.excerpt || "",
        author: data.author || "",
        status: data.status || "draft",
        featured_image: data.featured_image || ""
      });
      
      setTags(data.tags || []);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blog post details.",
        variant: "destructive",
      });
    } finally {
      setFetchLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, featured_image: publicUrl });
      
      toast({
        title: "Success",
        description: "Image uploaded successfully.",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image.",
        variant: "destructive",
      });
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      toast({
        title: "Error",
        description: "Title, content, and author are required.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const blogData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt || null,
        author: formData.author,
        status: formData.status,
        featured_image: formData.featured_image || null,
        tags: tags.length > 0 ? tags : null,
        published_at: formData.status === 'published' ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      };

      let error;
      if (isEditing) {
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update(blogData)
          .eq('id', id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('blog_posts')
          .insert([blogData]);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: "Success",
        description: `Blog post ${isEditing ? 'updated' : 'created'} successfully.`,
      });

      navigate("/admin/blog");
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} blog post.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate("/admin/blog")}
            variant="outline"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
            </h1>
            <p className="text-gray-600">
              {isEditing ? "Update blog post content" : "Create a new blog post for your website"}
            </p>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? "Saving..." : isEditing ? "Update Post" : "Save Post"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter blog post title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => handleChange("excerpt", e.target.value)}
                  placeholder="Brief description of the blog post"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  placeholder="Write your blog post content here..."
                  rows={15}
                />
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </label>
                <Input
                  value={formData.author}
                  onChange={(e) => handleChange("author", e.target.value)}
                  placeholder="Author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={imageUploading}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={imageUploading}
                      className="cursor-pointer"
                      asChild
                    >
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        {imageUploading ? "Uploading..." : "Upload Image"}
                      </span>
                    </Button>
                  </label>
                </div>
              </div>

              {formData.featured_image && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Current Image
                  </label>
                  <div className="relative">
                    <img
                      src={formData.featured_image}
                      alt="Featured"
                      className="w-full h-32 object-cover rounded border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setFormData({ ...formData, featured_image: "" })}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or paste Image URL
                </label>
                <Input
                  value={formData.featured_image}
                  onChange={(e) => handleChange("featured_image", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogForm;
