
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, Truck, ArrowUpRight } from "lucide-react";

export const PromoSection = () => {
  const benefits = [
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      title: "Easy Shopping",
      description: "User-friendly interface for a seamless shopping experience"
    },
    {
      icon: <Check className="h-5 w-5" />,
      title: "Quality Products",
      description: "Curated selection of high-quality products"
    },
    {
      icon: <Truck className="h-5 w-5" />,
      title: "Fast Delivery",
      description: "Reliable shipping and quick delivery options"
    }
  ];

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="mb-4">Why Choose Us</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Shopping Made Simple and Enjoyable</h2>
            <p className="text-muted-foreground mb-6">
              We believe shopping should be easy, secure, and personalized. Our platform provides you with the best shopping experience from start to finish.
            </p>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-3 p-2 bg-primary/10 rounded-full text-primary">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="flex items-center">
              Learn More
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="rounded-lg overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
              alt="Happy shopping experience"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-primary/30 to-transparent opacity-60"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
