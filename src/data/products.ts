
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  onSale?: boolean;
  rating?: number;
  reviewCount?: number;
}

export const categories = ["Electronics", "Clothing", "Home", "Books", "Sports"];

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    description: "Premium sound quality with active noise cancellation and 30-hour battery life.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    isNew: true,
    rating: 4.5,
    reviewCount: 127
  },
  {
    id: "2",
    name: "Smart Watch with Heart Rate Monitor",
    price: 129.99,
    description: "Track your fitness, sleep, and notifications with this waterproof smartwatch.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80",
    isBestSeller: true,
    rating: 4.7,
    reviewCount: 432
  },
  {
    id: "3",
    name: "Cotton T-Shirt",
    price: 19.99,
    description: "Comfortable, breathable cotton t-shirt in multiple colors.",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    onSale: true,
    rating: 4.3,
    reviewCount: 89
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    price: 249.99,
    description: "Fully adjustable office chair with lumbar support and breathable mesh.",
    category: "Home",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
    rating: 4.8,
    reviewCount: 56
  },
  {
    id: "5",
    name: "Bestselling Novel",
    price: 14.99,
    description: "The latest page-turner from a renowned author that everyone's talking about.",
    category: "Books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 201
  },
  {
    id: "6",
    name: "Yoga Mat",
    price: 29.99,
    description: "Non-slip, eco-friendly yoga mat with alignment lines.",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1594&q=80",
    rating: 4.6,
    reviewCount: 78
  },
  {
    id: "7",
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    description: "Vacuum insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    isNew: true,
    rating: 4.4,
    reviewCount: 112
  },
  {
    id: "8",
    name: "Wireless Phone Charger",
    price: 34.99,
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    onSale: true,
    rating: 4.2,
    reviewCount: 67
  },
  {
    id: "9",
    name: "Leather Wallet",
    price: 39.99,
    description: "Genuine leather wallet with RFID blocking technology.",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    rating: 4.7,
    reviewCount: 45
  },
  {
    id: "10",
    name: "Scented Candle Set",
    price: 19.99,
    description: "Set of three aromatherapy candles made with natural soy wax.",
    category: "Home",
    image: "https://images.unsplash.com/photo-1602599185968-45dec7b94bb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1229&q=80",
    onSale: true,
    rating: 4.5,
    reviewCount: 93
  },
  {
    id: "11",
    name: "Cookbook",
    price: 24.99,
    description: "Collection of 100+ recipes for quick and healthy meals.",
    category: "Books",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
    rating: 4.3,
    reviewCount: 29
  },
  {
    id: "12",
    name: "Resistance Bands Set",
    price: 17.99,
    description: "Set of five resistance bands of varying strengths for home workouts.",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1598346762291-aee88549193f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    isNew: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 156
  }
];
