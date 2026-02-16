import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { VendorDashboard } from './components/VendorDashboard';
import { Product, CartItem, UserRole, CATEGORIES, Order } from './types';
import { MOCK_PRODUCTS, MOCK_VENDORS, MOCK_ORDERS } from './constants';
import { Search, SlidersHorizontal, ArrowRight, CheckCircle, Package } from 'lucide-react';

const App = () => {
  // State
  const [role, setRole] = useState<UserRole>(UserRole.CUSTOMER);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock Vendor Data
  const currentVendor = MOCK_VENDORS[0];
  const [vendorOrders, setVendorOrders] = useState<Order[]>(MOCK_ORDERS);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) return { ...item, quantity: Math.max(1, item.quantity + delta) };
      return item;
    }));
  };

  const handleCheckout = () => {
    alert("Payment Gateway Integration (Mock): Payment Successful! Order Placed.");
    
    // Create mock order
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      customerId: 'current_user',
      customerName: 'Guest User',
      items: [...cart],
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      status: 'Processing',
      date: new Date().toISOString().split('T')[0]
    };

    setVendorOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setIsCartOpen(false);
  };

  // Vendor Logic
  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newProduct,
      id: `p${Date.now()}`,
    };
    setProducts(prev => [product, ...prev]);
  };

  // Filter Logic
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Views
  const renderMarketplace = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-600 to-indigo-700 rounded-3xl p-8 mb-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4 leading-tight">Discover Unique Products from Top Vendors</h1>
          <p className="text-brand-100 mb-8 text-lg">AI-curated marketplace for the modern shopper. Best prices, guaranteed quality.</p>
          <div className="flex bg-white rounded-xl p-2 shadow-lg max-w-lg">
            <Search className="h-6 w-6 text-gray-400 ml-3 mt-2" />
            <input 
              type="text" 
              placeholder="Search for products..." 
              className="flex-grow px-4 py-2 text-gray-900 outline-none placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-brand-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-700 transition-colors">
              Search
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
           <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFFFFF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.3C87.4,-33.5,90.1,-17.9,89.1,-2.4C88.1,13.1,83.4,28.4,75.2,41.9C67,55.4,55.3,67,42.1,74.6C28.9,82.2,14.2,85.8,-0.2,86.2C-14.6,86.6,-29.4,83.8,-42.9,76.5C-56.4,69.2,-68.7,57.4,-77.3,43.3C-85.9,29.2,-90.8,12.8,-88.9,-2.7C-87,-18.2,-78.3,-32.8,-67.7,-44.8C-57.1,-56.8,-44.6,-66.2,-31.2,-73.8C-17.8,-81.4,-3.5,-87.2,9.3,-84.9C22.1,-82.7,44.2,-72.4,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
        </div>
      </div>

      {/* Categories & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex overflow-x-auto pb-2 space-x-2 w-full md:w-auto no-scrollbar">
          <button
             onClick={() => setSelectedCategory('All')}
             className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
               selectedCategory === 'All' ? 'bg-brand-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-600 hover:text-brand-600'
             }`}
          >
            All Categories
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat ? 'bg-brand-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-600 hover:text-brand-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <button className="flex items-center text-gray-500 hover:text-brand-600">
          <SlidersHorizontal className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart}
              onViewDetails={() => {}} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
          <div className="text-gray-400 mb-2">No products found</div>
          <div className="text-sm text-gray-500">Try adjusting your search or category</div>
        </div>
      )}

      {/* Trust Badges */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-12 border-t border-gray-200">
        <div className="flex flex-col items-center">
          <div className="p-4 bg-green-100 rounded-full text-green-600 mb-4">
            <CheckCircle className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Secure Payments</h3>
          <p className="text-gray-500 text-sm max-w-xs">All transactions are encrypted and secured with industry standards.</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 bg-blue-100 rounded-full text-blue-600 mb-4">
            <Package className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
          <p className="text-gray-500 text-sm max-w-xs">Track your orders in real-time with our advanced logistics partners.</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 bg-purple-100 rounded-full text-purple-600 mb-4">
             <ArrowRight className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Easy Returns</h3>
          <p className="text-gray-500 text-sm max-w-xs">Not satisfied? Return within 30 days for a full refund, no questions asked.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar 
        role={role} 
        setRole={setRole} 
        cartItemCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onHomeClick={() => setRole(UserRole.CUSTOMER)}
        onVendorDashboardClick={() => setRole(UserRole.VENDOR)}
      />

      <main>
        {role === UserRole.CUSTOMER ? renderMarketplace() : (
          <VendorDashboard 
            vendor={currentVendor} 
            products={products.filter(p => p.vendorId === currentVendor.id || role === UserRole.VENDOR)}
            orders={vendorOrders}
            onAddProduct={handleAddProduct}
          />
        )}
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default App;