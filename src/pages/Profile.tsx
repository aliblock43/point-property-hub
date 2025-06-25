
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Profile = () => {
  // Array of 31 high-quality portfolio images from Unsplash
  const portfolioImages = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1920&h=1080&fit=crop"
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
