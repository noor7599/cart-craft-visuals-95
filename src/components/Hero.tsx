
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32 flex flex-col md:flex-row items-center justify-between">
        <div className="md:max-w-lg z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Shop the Latest <span className="text-primary">Trends</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            Discover our curated collection of high-quality products at competitive prices, with fast shipping and exceptional customer service.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild className="animate-fade-in">
              <Link to="/">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="animate-fade-in delay-100">
              <Link to="/orders">View Orders</Link>
            </Button>
          </div>
        </div>
        <div className="mt-10 md:mt-0 md:ml-10 relative z-10">
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  i % 2 === 0 ? "translate-y-4 md:translate-y-8" : ""
                }`}
              >
                <img 
                  src={`https://images.unsplash.com/photo-${
                    i === 0 ? "1505740420928-5e560c06d30e" : 
                    i === 1 ? "1523275335684-37898b6baf30" : 
                    i === 2 ? "1576566588028-4147f3842f27" : 
                    "1602143407151-7111542de6e8"
                  }?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`} 
                  alt={`Featured product ${i+1}`}
                  className="w-full h-32 md:h-40 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary/5 rounded-full opacity-70"></div>
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/5 rounded-full opacity-70"></div>
      </div>
    </div>
  );
};
