
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    description: "High-quality wireless headphones with noise cancellation",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    description: "Track your fitness and stay connected with this smartwatch",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    name: "Premium Sneakers",
    price: 79.99,
    description: "Comfortable sneakers for everyday use",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "4",
    name: "Leather Wallet",
    price: 49.99,
    description: "Genuine leather wallet with multiple card slots",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "5",
    name: "Coffee Maker",
    price: 129.99,
    description: "Automatic coffee maker with timer function",
    category: "Home",
    image: "https://images.unsplash.com/photo-1520970519539-8b352d0ac342?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "6",
    name: "Backpack",
    price: 59.99,
    description: "Durable backpack with laptop compartment",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=800&q=80"
  }
];

export const categories = Array.from(new Set(products.map(product => product.category)));
