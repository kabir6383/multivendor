import React from 'react';
import { Product } from '../types';
import { Star, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden">
      <div 
        className="relative pt-[100%] bg-gray-100 cursor-pointer overflow-hidden"
        onClick={() => onViewDetails(product)}
      >
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-semibold text-gray-700 flex items-center shadow-sm">
          <Star className="h-3 w-3 text-yellow-400 mr-1 fill-yellow-400" />
          {product.rating}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-brand-600 font-semibold mb-1 uppercase tracking-wider">{product.category}</div>
        <h3 
          className="text-gray-900 font-bold text-lg mb-1 cursor-pointer hover:text-brand-600 truncate"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="flex items-center justify-center p-2 rounded-lg bg-brand-50 text-brand-600 hover:bg-brand-600 hover:text-white transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};