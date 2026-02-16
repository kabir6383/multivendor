import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Plus, Package, DollarSign, TrendingUp, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { Product, Order, Vendor, CATEGORIES } from '../types';
import { generateProductDescription, suggestPricingStrategy } from '../services/descriptionGenerator';

interface VendorDashboardProps {
  vendor: Vendor;
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
}

export const VendorDashboard: React.FC<VendorDashboardProps> = ({ vendor, products, orders, onAddProduct }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'services'>('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: CATEGORIES[0],
    price: '',
    description: '',
    stock: '',
    imageUrl: `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPricing, setAiPricing] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleGenerateDescription = async () => {
    if (!newProduct.name) return;
    setIsGenerating(true);
    const desc = await generateProductDescription(newProduct.name, newProduct.category, "High quality, durable, modern design");
    setNewProduct(prev => ({ ...prev, description: desc }));
    
    const pricing = await suggestPricingStrategy(newProduct.name, newProduct.category);
    setAiPricing(pricing);
    
    setIsGenerating(false);
  };

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct({
      vendorId: vendor.id,
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      imageUrl: newProduct.imageUrl,
      stock: parseInt(newProduct.stock),
      rating: 0,
      reviewCount: 0
    });
    setIsModalOpen(false);
    setNewProduct({
      name: '',
      category: CATEGORIES[0],
      price: '',
      description: '',
      stock: '',
      imageUrl: `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`
    });
    setAiPricing(null);
  };

  // Chart Data Preparation
  const data = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-500">Welcome back, {vendor.storeName}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value={formatPrice(vendor.totalSales)} icon={DollarSign} color="bg-green-500" />
        <StatCard title="Total Orders" value={orders.length} icon={Package} color="bg-blue-500" />
        <StatCard title="Active Products" value={products.length} icon={Package} color="bg-purple-500" />
        <StatCard title="Growth" value="+12.5%" icon={TrendingUp} color="bg-orange-500" />
      </div>

      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 w-fit">
        {['overview', 'products', 'orders', 'services'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
              activeTab === tab 
                ? 'bg-white text-brand-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm min-h-[400px]">
        {activeTab === 'overview' && (
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Weekly Sales Performance</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} tickFormatter={(value) => `₹${value}`} />
                  <Tooltip 
                    cursor={{fill: '#f3f4f6'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="sales" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img src={p.imageUrl} alt="" className="h-10 w-10 rounded object-cover mr-3" />
                        <span className="font-medium text-gray-900">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{p.category}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatPrice(p.price)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{p.stock} units</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="p-6">
             <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Order ID</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Total</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm text-gray-500">{o.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{o.customerName}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatPrice(o.total)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          o.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          o.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Microservices Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "Order Processing Service", status: "Operational", ping: "24ms" },
                  { name: "Inventory Management Service", status: "Operational", ping: "45ms" },
                  { name: "Payment Gateway Integration", status: "Operational", ping: "120ms" },
                  { name: "Review Sentiment Service", status: "Idle", ping: "---" },
                  { name: "Notification Service", status: "Operational", ping: "32ms" },
                ].map((service, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                     <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-green-500 mr-3 animate-pulse"></div>
                        <div>
                          <p className="font-semibold text-gray-800">{service.name}</p>
                          <p className="text-xs text-gray-500">Latency: {service.ping}</p>
                        </div>
                     </div>
                     <div className="px-3 py-1 bg-gray-100 rounded text-xs text-gray-600 font-medium">
                        {service.status}
                     </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleSubmitProduct} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <button 
                      type="button"
                      onClick={handleGenerateDescription}
                      disabled={isGenerating || !newProduct.name}
                      className="text-xs flex items-center text-brand-600 hover:text-brand-700 font-semibold disabled:opacity-50"
                    >
                      {isGenerating ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Sparkles className="h-3 w-3 mr-1" />}
                      Generate with AI
                    </button>
                  </div>
                  <textarea 
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    placeholder={isGenerating ? "Generating description..." : "Enter detailed product description..."}
                  />
                </div>

                {aiPricing && (
                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-700">{aiPricing}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                    <input 
                      required
                      type="number" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                    <input 
                      required
                      type="number" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg mr-3"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 shadow-md shadow-brand-200"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};