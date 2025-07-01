
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Profile = () => {
  // Array of 31 high-quality portfolio images from Unsplash
  const portfolioImages = [
    "/lovable-uploads/PP1.png",
    "/lovable-uploads/PP2.png",
    "/lovable-uploads/PP3.png",
    "/lovable-uploads/PP4.png",
    "/lovable-uploads/PP5.png",
    "/lovable-uploads/PP6.png",
    "/lovable-uploads/PP7.png",
    "/lovable-uploads/PP8.png",
    "/lovable-uploads/PP9.png",
    "/lovable-uploads/PP10.png",
    "/lovable-uploads/PP11.png",
    "/lovable-uploads/PP12.png",
    "/lovable-uploads/PP13.png",
    "/lovable-uploads/PP14.png",
    "/lovable-uploads/PP15.png",
    "/lovable-uploads/PP16.png",
    "/lovable-uploads/PP17.png",
    "/lovable-uploads/PP18.png",
    "/lovable-uploads/PP19.png",
    "/lovable-uploads/PP20.png",
    "/lovable-uploads/PP21.png",
    "/lovable-uploads/PP22.png",
    "/lovable-uploads/PP23.png",
    "/lovable-uploads/PP24.png",
    "/lovable-uploads/PP25.png",
    "/lovable-uploads/PP26.png",
    "/lovable-uploads/PP27.png",
    "/lovable-uploads/PP28.png",
    "/lovable-uploads/PP29.png",
    "/lovable-uploads/PP30.png",
    "/lovable-uploads/PP31.png"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Title */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A curated collection of our finest work and creative vision
          </p>
        </div>
      </div>

      {/* Portfolio Images - Full Width, No Gaps */}
      <div className="w-full">
        {portfolioImages.map((imageUrl, index) => (
          <div key={index} className="w-full">
            <AspectRatio ratio={16/9} className="w-full">
              <img
                src={imageUrl}
                alt={`Portfolio image ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index < 3 ? "eager" : "lazy"}
              />
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
