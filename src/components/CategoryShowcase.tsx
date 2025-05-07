
import { categories } from "@/data/products";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CategoryShowcase = () => {
  // Sample images for categories
  const categoryImages = [
    "https://images.unsplash.com/photo-1588508065123-287b28e013da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80", // Electronics
    "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80", // Clothing
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80", // Home
    "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80", // Books
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80", // Sports
  ];

  return (
    <div className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Shop by Category</h2>
        <p className="text-muted-foreground mb-8">Browse our product collections</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Link 
              to={`/?category=${category}`}
              key={category} 
              className="relative overflow-hidden rounded-lg group h-40 md:h-60 transition-transform hover:scale-105"
              aria-label={`Browse ${category} category`}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-10"></div>
              <img 
                src={categoryImages[index]} 
                alt={category} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-lg mb-1">{category}</h3>
                <div className="flex items-center text-white/80 text-sm group-hover:text-white transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="ml-1 h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
