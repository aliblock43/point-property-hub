
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, X } from "lucide-react";

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
            <Dialog key={index} open={selectedMap === index} onOpenChange={(open) => setSelectedMap(open ? index : null)}>
              <DialogTrigger asChild>
                <div 
                  className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => setSelectedMap(index)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={mapHeadings[index]}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {mapHeadings[index]}
                    </h3>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(index);
                      }}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
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
                      alt={`${mapHeadings[index]} - Full Size`}
                      className="w-full h-full object-contain bg-gray-50"
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Maps