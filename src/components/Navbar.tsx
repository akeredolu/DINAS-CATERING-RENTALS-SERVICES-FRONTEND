"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, PhoneCall } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold text-amber-500 tracking-wide">
            DINAS <span className="text-white text-lg font-light">CATERING & RENTALS SERVICES</span>
          </Link>

          <div className="hidden md:flex space-x-8 items-center font-medium">
            <Link href="/" className="hover:text-amber-500 transition">Home</Link>
            <Link href="/about" className="hover:text-amber-500 transition">About</Link>
            <Link href="/catering" className="hover:text-amber-500 transition">Catering</Link>
            <Link href="/rentals" className="hover:text-amber-500 transition">Rentals</Link>
            <Link href="/contact" className="hover:text-amber-500 transition">Contact Us</Link>
            
            <Link href="/cart" className="relative p-2 bg-emerald-950 rounded-full hover:bg-emerald-900 transition">
              <ShoppingCart className="w-5 h-5 text-amber-500" />
              <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">0</span>
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-amber-500">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 px-4 pt-2 pb-4 space-y-2 border-t border-slate-700">
          <Link href="/" className="block py-2 text-white hover:text-amber-500">Home</Link>
          <Link href="/about" className="block py-2 text-white hover:text-amber-500">About</Link>
          <Link href="/catering" className="block py-2 text-white hover:text-amber-500">Catering</Link>
          <Link href="/rentals" className="block py-2 text-white hover:text-amber-500">Rentals</Link>
          <Link href="/contact" className="block py-2 text-white hover:text-amber-500">Contact</Link>
        </div>
      )}
    </nav>
  );
}
