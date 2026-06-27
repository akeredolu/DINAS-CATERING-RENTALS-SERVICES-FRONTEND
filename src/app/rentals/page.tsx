"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Layers, Tent, Plus, Info, Sparkles } from 'lucide-react';

interface RentalItem {
  id: number;
  name: string;
  price: number;
  desc: string;
  img: string;
}

export default function RentalsCatalog() {
  const { addToCart } = useCart();

  // --- Live State Managers for Dashboard Stream ---
  const [rentals, setRentals] = useState<RentalItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLogisticsMenu = async () => {
      try {
        // 🚀 DYNAMIC ROUTING PATHWAY: Abstracted route pointing straight to active API
        const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
        
        const response = await fetch(`${backendBaseUrl}/api/marketplace-catalog/`);
        if (response.ok) {
          const data = await response.json();
          // Filtered automatically right out of our dual marketplace data pipeline stream
          setRentals(data.catalog.hardware || []);
        }
      } catch (err) {
        console.error("Failed to fetch live admin rental inventory items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogisticsMenu();
  }, []);

  // Standardized Currency Formatter for Nigerian Naira
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 relative">
      {/* Decorative ambient background mesh for v4 layout consistency */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-50/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Standardized Header Block */}
      <div className="mb-16 text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border border-amber-200/30">
          <Tent className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>Premium Material Logistics</span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight sm:text-5xl">
          Event <span className="text-emerald-900">Rental Supplies</span>
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
          Rent high-end furniture, premium tableware, and heavy-duty outdoor canopies. 
        </p>
      </div>

      {/* Loading & Empty State Catch Framework */}
      {loading ? (
        <div className="text-center py-20 text-xs text-slate-400 font-bold uppercase tracking-widest animate-pulse">
          Loading live logistics catalog matrices...
        </div>
      ) : rentals.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white border border-dashed border-slate-200 rounded-3xl max-w-md mx-auto space-y-2">
          <Tent className="w-8 h-8 text-slate-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-900">Logistics Inventory Empty</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            No logistics supplies are published inside your database yet. Go into your Django Admin to add items under Category rows marked as true for rentals.
          </p>
        </div>
      ) : (
        /* Dynamic Grid Layout Hooked onto PostgreSQL Database */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rentals.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 p-0.5 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-slate-200/80 hover:-translate-y-1 transition duration-300 group"
            >
              {/* Visual Header Image Section */}
              <div className="relative overflow-hidden aspect-video sm:aspect-square md:aspect-video rounded-3xl m-1.5">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-amber-500 font-black text-[9px] tracking-widest uppercase px-3 py-1.5 rounded-xl border border-slate-800/40 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-amber-500" /> Equipment Asset
                </div>
              </div>

              {/* Inner Descriptive Details Container */}
              <div className="p-6 pt-4 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-black text-slate-900 leading-snug group-hover:text-emerald-900 transition">
                    {item.name}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                {/* Action and Price Tier Line */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xl font-black text-slate-900 tracking-tight">
                      {formatNaira(Number(item.price))}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-medium">
                      per unit daily
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => addToCart({ id: item.id, name: item.name, price: Number(item.price), quantity: 1, image: item.img, isRental: true })}
                    className="bg-emerald-900 hover:bg-emerald-950 text-white px-4 py-3 rounded-xl transition text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-950/10 cursor-pointer group/btn active:scale-98"
                  >
                    <Plus className="w-4 h-4 text-amber-500 group-hover/btn:rotate-90 transition duration-200" /> 
                    <span>Add Supply</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}