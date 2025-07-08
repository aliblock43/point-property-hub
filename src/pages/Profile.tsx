
import React, { Suspense } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Profile = () => {
  // Array of 31 high-quality portfolio images from Unsplash
  const portfolioImages = [
    "/lovable-uploads/PP1.webp",
    "/lovable-uploads/PP2.webp",
    "/lovable-uploads/PP3.webp",
    "/lovable-uploads/PP4.webp",
    "/lovable-uploads/PP5.webp",
    "/lovable-uploads/PP6.webp",
    "/lovable-uploads/PP7.webp",
    "/lovable-uploads/PP8.webp",
    "/lovable-uploads/PP9.webp",
    "/lovable-uploads/PP10.webp",
    "/lovable-uploads/PP11.webp",
    "/lovable-uploads/PP12.webp",
    "/lovable-uploads/PP13.webp",
    "/lovable-uploads/PP14.webp",
    "/lovable-uploads/PP15.webp",
    "/lovable-uploads/PP16.webp",
    "/lovable-uploads/PP17.webp",
    "/lovable-uploads/PP18.webp",
    "/lovable-uploads/PP19.webp",
    "/lovable-uploads/PP20.webp",
    "/lovable-uploads/PP21.webp",
    "/lovable-uploads/PP22.webp",
    "/lovable-uploads/PP23.webp",
    "/lovable-uploads/PP24.webp",
    "/lovable-uploads/PP25.webp",
    "/lovable-uploads/PP26.webp",
    "/lovable-uploads/PP27.webp",
    "/lovable-uploads/PP28.webp",
    "/lovable-uploads/PP29.webp",
    "/lovable-uploads/PP30.webp",
    "/lovable-uploads/PP31.webp"
  ];

  const ImageSkeleton = () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
      <div className="text-gray-400 text-sm">Loading...</div>
    </div>
  );

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
              <Suspense fallback={<ImageSkeleton />}>
                <img
                  src={imageUrl}
                  alt={`Portfolio showcase ${index + 1} - Professional real estate project`}
                  className="w-full h-full object-cover"
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </Suspense>
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
