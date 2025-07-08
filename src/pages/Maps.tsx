
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, Eye } from "lucide-react";

const Maps = () => {
  const [selectedMap, setSelectedMap] = useState<number | null>(null);

  // Sample map images from Unsplash - using map/geography related images
  const mapImages = [
    "/lovable-uploads/PHASE1-5.jpg",
    "/lovable-uploads/PHASE6.jpg",
    "/lovable-uploads/PHASE8.jpg",
    "/lovable-uploads/PHASE9.jpg",
    "/lovable-uploads/DHABWP.jpg",
    "/lovable-uploads/IVYGREEN.jpg",
    "/lovable-uploads/IXTOWN.jpg",
    "/lovable-uploads/DHAMUL.jpg",
    "/lovable-uploads/PARAGON.jpg",
    "/lovable-uploads/DHAQUE.jpg",
    "/lovable-uploads/DHAEME.jpg",
    "/lovable-uploads/DHACOMMERCIAL.jpg",
  ];

  // Custom headings for each map
  const mapHeadings = [
    "PHASE 1",
    "PHASE 6", 
    "PHASE 8",
    "PHASE 9",
    "DHA BAHAWALPUR",
    "IVY GREEN",
    "IX TOWN",
    "DHA MULTAN",
    "PARAGON",
    "DHA QUETTA",
    "DHA EME",
    "DHA COMMERCIAL"
  ];

  const handleDownload = (mapIndex: number) => {
    const link = document.createElement("a");
    link.href = mapImages[mapIndex];
    link.download = `${mapHeadings[mapIndex]}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Maps
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our collection of detailed maps and geographical references
          </p>
        </div>
      </div>

      {/* Maps Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mapImages.map((imageUrl, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              {/* Card Header with gradient background instead of image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-orange-100 via-orange-50 to-gray-100 flex items-center justify-center relative">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    {mapHeadings[index].charAt(0)}
                  </div>
                  <p className="text-gray-600 text-sm font-medium">
                    Click to view map
                  </p>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-4">
                <h3 
                  className="text-lg font-semibold text-gray-900 mb-3 cursor-pointer hover:text-orange-600 transition-colors"
                  onClick={() => setSelectedMap(index)}
                >
                  {mapHeadings[index]}
                </h3>
                
                <div className="flex space-x-2">
                  {/* View Map Button */}
                  <Dialog open={selectedMap === index} onOpenChange={(open) => setSelectedMap(open ? index : null)}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50"
                        onClick={() => setSelectedMap(index)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Map
                      </Button>
                    </DialogTrigger>
                    
                    <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-gray-900">
                          {mapHeadings[index]}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="mt-4">
                        <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
                          <img
                            src={imageUrl}
                            alt={`${mapHeadings[index]} - Detailed Map View`}
                            className="w-full h-full object-contain bg-gray-50"
                            loading="lazy"
                          />
                        </div>
                        
                        <div className="mt-6 flex justify-center">
                          <Button
                            onClick={() => handleDownload(index)}
                            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3"
                          >
                            <Download className="w-5 h-5 mr-2" />
                            Download {mapHeadings[index]}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {/* Download Button */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(index);
                    }}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Maps;
