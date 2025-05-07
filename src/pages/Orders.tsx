
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package } from "lucide-react";

interface Order {
  id: string;
  items: any[];
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  createdAt: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would be an API call
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    setLoading(false);
  }, []);

  const viewOrderDetails = (orderId: string) => {
    navigate(`/orders/${orderId}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-40 items-center justify-center">
          <p>Loading your orders...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold">My Orders</h1>

        {orders.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Orders Yet</CardTitle>
              <CardDescription>
                You haven't placed any orders yet.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Package className="mb-4 h-16 w-16 text-muted-foreground" />
              <p className="mb-4 text-muted-foreground">
                When you place orders, they will appear here.
              </p>
              <Button onClick={() => navigate("/")}>Start Shopping</Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View and track your recent orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders
                      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            #{order.id}
                          </TableCell>
                          <TableCell>
                            {format(new Date(order.createdAt), "MMM dd, yyyy")}
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex rounded-full px-2 py-1 text-xs font-medium">
                              {order.status === "Processing" ? (
                                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                  Processing
                                </span>
                              ) : order.status === "Shipped" ? (
                                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                                  Shipped
                                </span>
                              ) : (
                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                  Delivered
                                </span>
                              )}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            ${order.total.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => viewOrderDetails(order.id)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Orders;
