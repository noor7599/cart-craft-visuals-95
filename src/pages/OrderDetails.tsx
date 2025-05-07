
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check, Package, Truck } from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Steps,
  Step
} from "@/components/Steps";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingInfo {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  createdAt: string;
  shippingInfo: ShippingInfo;
}

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would be an API call
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      const orders = JSON.parse(savedOrders);
      const foundOrder = orders.find((o: Order) => o.id === orderId);
      setOrder(foundOrder || null);
    }
    setLoading(false);
  }, [orderId]);

  if (loading) {
    return (
      <Layout>
        <div className="flex h-40 items-center justify-center">
          <p>Loading order details...</p>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold">Order Not Found</h1>
          <p className="mb-8">We couldn't find the order you're looking for.</p>
          <Button onClick={() => navigate("/orders")}>View All Orders</Button>
        </div>
      </Layout>
    );
  }

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getStepStatus = (step: string) => {
    const status = order.status;
    
    switch(step) {
      case "Processing":
        return "complete";
      case "Shipped":
        return status === "Processing" ? "upcoming" : "complete";
      case "Delivered":
        return status === "Delivered" ? "complete" : "upcoming";
      default:
        return "upcoming";
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate("/orders")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Order #{order.id}</CardTitle>
                <CardDescription>Placed on {formattedDate}</CardDescription>
              </div>
              <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {order.status}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <Steps>
              <Step 
                icon={<Package />} 
                title="Order Processing" 
                description="Your order has been received and is being processed"
                status={getStepStatus("Processing")}
              />
              <Step 
                icon={<Truck />} 
                title="Order Shipped" 
                description="Your order has been shipped and is on its way"
                status={getStepStatus("Shipped")}
              />
              <Step 
                icon={<Check />} 
                title="Order Delivered" 
                description="Your order has been delivered"
                status={getStepStatus("Delivered")}
              />
            </Steps>

            <div>
              <h3 className="mb-4 text-lg font-semibold">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-16 w-16 overflow-hidden rounded">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-lg font-semibold">Shipping Information</h3>
                <div className="rounded-md bg-secondary/50 p-4 text-sm">
                  <p className="font-semibold">{order.shippingInfo.fullName}</p>
                  <p>{order.shippingInfo.address}</p>
                  <p>{order.shippingInfo.city}, {order.shippingInfo.postalCode}</p>
                  <p>{order.shippingInfo.country}</p>
                  <p className="mt-2">{order.shippingInfo.email}</p>
                </div>
              </div>
              
              <div>
                <h3 className="mb-2 text-lg font-semibold">Order Summary</h3>
                <div className="rounded-md bg-secondary/50 p-4 space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              If you have any questions about your order, please contact our customer support.
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default OrderDetails;
