import React from 'react';
import { ShoppingCart, Store, User, LogOut, Package } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  cartItemCount: number;
  onCartClick: () => void;
  onHomeClick: () => void;
  onVendorDashboardClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  role, 
  setRole, 
  cartItemCount, 
  onCartClick,
  onHomeClick,
  onVendorDashboardClick
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={onHomeClick}>
            <Store className="h-8 w-8 text-brand-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Bazaar AI</span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setRole(UserRole.CUSTOMER)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  role === UserRole.CUSTOMER 
                    ? 'bg-white text-brand-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => setRole(UserRole.VENDOR)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  role === UserRole.VENDOR 
                    ? 'bg-white text-brand-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Vendor
              </button>
            </div>

            {role === UserRole.CUSTOMER && (
              <button 
                onClick={onCartClick}
                className="relative p-2 text-gray-600 hover:text-brand-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-600 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}

            {role === UserRole.VENDOR && (
              <button 
                onClick={onVendorDashboardClick}
                className="flex items-center space-x-1 text-gray-600 hover:text-brand-600"
              >
                <Package className="h-5 w-5" />
                <span className="text-sm font-medium">Dashboard</span>
              </button>
            )}

            <div className="flex items-center space-x-2 border-l pl-6 border-gray-200">
              <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
                <User className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};