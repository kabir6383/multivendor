import { Product, Review, Vendor, Order } from './types';

export const MOCK_VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: 'Rahul Sharma',
    storeName: 'TechHub India',
    joinedDate: '2023-01-15',
    totalSales: 154000,
    balance: 45000,
    commissionRate: 0.10,
  },
  {
    id: 'v2',
    name: 'Priya Singh',
    storeName: 'Ethnic Threads',
    joinedDate: '2023-03-20',
    totalSales: 89000,
    balance: 12000,
    commissionRate: 0.12,
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    vendorId: 'v1',
    name: 'Wireless Noise Cancelling Headphones',
    description: 'Immerse yourself in music with these premium noise-cancelling headphones. Featuring 30-hour battery life and ultra-comfortable ear pads.',
    price: 4999,
    category: 'Electronics',
    imageUrl: 'https://picsum.photos/400/400?random=1',
    rating: 4.5,
    reviewCount: 120,
    stock: 45
  },
  {
    id: 'p2',
    vendorId: 'v2',
    name: 'Handcrafted Silk Saree',
    description: 'Elegant Banarasi silk saree with intricate zari work. Perfect for weddings and festive occasions.',
    price: 12500,
    category: 'Fashion',
    imageUrl: 'https://picsum.photos/400/400?random=2',
    rating: 4.8,
    reviewCount: 45,
    stock: 12
  },
  {
    id: 'p3',
    vendorId: 'v1',
    name: 'Smart Fitness Watch',
    description: 'Track your health metrics with precision. Monitors heart rate, sleep, and steps. Water-resistant up to 50m.',
    price: 2999,
    category: 'Electronics',
    imageUrl: 'https://picsum.photos/400/400?random=3',
    rating: 4.2,
    reviewCount: 89,
    stock: 100
  },
  {
    id: 'p4',
    vendorId: 'v2',
    name: 'Organic Face Serum',
    description: 'Rejuvenate your skin with our 100% organic Vitamin C serum. Glowing skin in just 2 weeks.',
    price: 899,
    category: 'Beauty',
    imageUrl: 'https://picsum.photos/400/400?random=4',
    rating: 4.6,
    reviewCount: 230,
    stock: 50
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    productId: 'p1',
    userId: 'u1',
    userName: 'Amit K.',
    rating: 5,
    comment: 'Best headphones for this price range! Bass is amazing.',
    date: '2023-10-12'
  },
  {
    id: 'r2',
    productId: 'p1',
    userId: 'u2',
    userName: 'Sneha P.',
    rating: 4,
    comment: 'Good sound quality but a bit heavy on the head.',
    date: '2023-10-15'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_12345',
    customerId: 'c1',
    customerName: 'Vikram Malhotra',
    items: [
      { ...MOCK_PRODUCTS[0], quantity: 1 }
    ],
    total: 4999,
    status: 'Delivered',
    date: '2023-10-01'
  },
  {
    id: 'ord_67890',
    customerId: 'c2',
    customerName: 'Anjali Desai',
    items: [
      { ...MOCK_PRODUCTS[1], quantity: 1 }
    ],
    total: 12500,
    status: 'Processing',
    date: '2023-10-25'
  }
];