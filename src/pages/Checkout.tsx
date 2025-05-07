
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, ArrowRight, Check, CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface CheckoutFormData {
  email: string;
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const initialFormData: CheckoutFormData = {
  email: "",
  fullName: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

const Checkout = () => {
  const [activeStep, setActiveStep] = useState("info");
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Partial<CheckoutFormData>>({});
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (items.length === 0) {
      navigate("/");
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Please add some items.",
      });
    }
  }, [items, navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when input changes
    if (formErrors[name as keyof CheckoutFormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const errors: Partial<CheckoutFormData> = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.fullName) errors.fullName = "Full name is required";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.postalCode) errors.postalCode = "Postal code is required";
    if (!formData.country) errors.country = "Country is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (activeStep === "info") {
      if (validateForm()) {
        setActiveStep("review");
      }
    } else if (activeStep === "review") {
      setActiveStep("payment");
    }
  };

  const handlePreviousStep = () => {
    if (activeStep === "review") {
      setActiveStep("info");
    } else if (activeStep === "payment") {
      setActiveStep("review");
    }
  };

  const handlePlaceOrder = () => {
    // Here you would typically send the order to a backend
    // For now, we'll just simulate a successful order
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Save order to localStorage for later retrieval
    const order = {
      id: orderId,
      items,
      subtotal,
      shipping: 0,
      total: subtotal,
      status: "Processing",
      createdAt: new Date().toISOString(),
      shippingInfo: formData,
    };
    
    const savedOrders = localStorage.getItem("orders");
    const orders = savedOrders ? JSON.parse(savedOrders) : [];
    localStorage.setItem("orders", JSON.stringify([...orders, order]));
    
    // Clear the cart and show success message
    clearCart();
    
    toast({
      title: "Order placed successfully!",
      description: `Your order #${orderId} has been placed.`,
    });
    
    navigate(`/orders/${orderId}`);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
        
        <Tabs value={activeStep} onValueChange={setActiveStep} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info" disabled={activeStep !== "info"}>
              1. Information
            </TabsTrigger>
            <TabsTrigger value="review" disabled={activeStep === "info"}>
              2. Review
            </TabsTrigger>
            <TabsTrigger value="payment" disabled={activeStep !== "payment"}>
              3. Payment
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>
                  Fill in your shipping details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={formErrors.email ? "border-destructive" : ""}
                  />
                  {formErrors.email && (
                    <p className="text-sm text-destructive">{formErrors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={formErrors.fullName ? "border-destructive" : ""}
                  />
                  {formErrors.fullName && (
                    <p className="text-sm text-destructive">{formErrors.fullName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="123 Main St"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={formErrors.address ? "border-destructive" : ""}
                  />
                  {formErrors.address && (
                    <p className="text-sm text-destructive">{formErrors.address}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="San Francisco"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={formErrors.city ? "border-destructive" : ""}
                    />
                    {formErrors.city && (
                      <p className="text-sm text-destructive">{formErrors.city}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      placeholder="94103"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={formErrors.postalCode ? "border-destructive" : ""}
                    />
                    {formErrors.postalCode && (
                      <p className="text-sm text-destructive">{formErrors.postalCode}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    placeholder="United States"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={formErrors.country ? "border-destructive" : ""}
                  />
                  {formErrors.country && (
                    <p className="text-sm text-destructive">{formErrors.country}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto" onClick={handleNextStep}>
                  Continue to Review
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="review" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Your Order</CardTitle>
                <CardDescription>
                  Check your items and shipping details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold">Items in Your Cart</h3>
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <div className="h-12 w-12 overflow-hidden rounded">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="mb-2 font-semibold">Shipping Information</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Name:</span> {formData.fullName}</p>
                    <p><span className="font-medium">Email:</span> {formData.email}</p>
                    <p><span className="font-medium">Address:</span> {formData.address}</p>
                    <p><span className="font-medium">City:</span> {formData.city}</p>
                    <p><span className="font-medium">Postal Code:</span> {formData.postalCode}</p>
                    <p><span className="font-medium">Country:</span> {formData.country}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="mb-2 font-semibold">Order Summary</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePreviousStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNextStep}>
                  Continue to Payment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>
                  Complete your purchase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border p-6 text-center">
                  <CreditCard className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-xl font-semibold">Payment Integration Coming Soon</h3>
                  <p className="text-muted-foreground">
                    In this demo version, you can place an order without entering payment details.
                    Stripe integration will be added later.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePreviousStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handlePlaceOrder}>
                  <Check className="mr-2 h-4 w-4" />
                  Place Order
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Checkout;
