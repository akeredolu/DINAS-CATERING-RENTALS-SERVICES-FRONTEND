"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function InstantQuoteBuilder() {
  const [guests, setGuests] = useState<number>(100);
  const [menuTier, setMenuTier] = useState<string>('standard');
  const [needCanopies, setNeedCanopies] = useState<boolean>(false);

  // Memoized derived state recalculates dynamically whenever inputs change
  const calculatedTotal = useMemo(() => {
    const perGuestRate = menuTier === 'premium' ? 4500 : menuTier === 'executive' ? 7500 : 2500;
    const baseFoodCost = guests * perGuestRate;
    
    let logisticsFee = 0;
    if (needCanopies) {
      const tentCount = Math.ceil(guests / 50);
      logisticsFee = tentCount * 45000;
    }

    return baseFoodCost + logisticsFee;
  }, [guests, menuTier, needCanopies]);

  // Currency Formatter for Nigerian Naira
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12 space-y-2">
        <h1 className="text-3xl font-black text-slate-900 flex items-center justify-center gap-2">
          <Calculator className="w-8 h-8 text-amber-500" /> Budget Estimation Portal
        </h1>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Adjust guest profiles, choose food configurations, and see projected logistical tallies instantly.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8 items-start">
        {/* Input Configuration Panel */}
        <div className="md:col-span-3 bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm space-y-6">
          
          {/* Guest slider element */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <label htmlFor="guest-range">Target Guest Capacity</label>
              <span className="text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded">{guests} Attendees</span>
            </div>
            <input 
              id="guest-range"
              type="range" min="20" max="1000" step="10" value={guests} 
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full accent-emerald-900 cursor-pointer h-2 bg-slate-100 rounded-lg"
            />
          </div>

          {/* Menu selection drop menu */}
          <div className="space-y-2">
            <label htmlFor="menu-select" className="text-xs font-bold text-slate-700 block">Menu Composition Tier</label>
            <select 
              id="menu-select"
              value={menuTier} onChange={(e) => setMenuTier(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-900"
            >
              <option value="standard">Standard Native Tier (₦2,500 / head)</option>
              <option value="premium">Premium Continental Buffet (₦4,500 / head)</option>
              <option value="executive">Executive Imperial Dinner (₦7,500 / head)</option>
            </select>
          </div>

          {/* Toggle Logistics box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
            <div className="space-y-0.5">
              <label htmlFor="canopy-checkbox" className="text-xs font-bold text-slate-900 block">Include Canopy Tents?</label>
              <span className="text-[10px] text-slate-400 block">Auto-calculates quantity based on guest count.</span>
            </div>
            <input 
              id="canopy-checkbox"
              type="checkbox" checked={needCanopies} onChange={(e) => setNeedCanopies(e.target.checked)}
              className="w-5 h-5 rounded accent-emerald-900 cursor-pointer"
            />
          </div>
        </div>

        {/* Real-time Calculation Display Panel */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 rounded-2xl border border-slate-800 shadow-md relative overflow-hidden">
            <h3 className="text-xs font-black uppercase text-amber-500 tracking-wider mb-2">Invoice Projection</h3>
            
            <div className="space-y-4">
              <div>
                <span className="text-3xl font-black text-white">{formatNaira(calculatedTotal)}</span>
                <span className="text-[10px] text-slate-400 block mt-1">Estimated Grand Total</span>
              </div>
              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1.5">
                <div className="flex justify-between"><span>Guest count:</span> <span className="text-white font-medium">{guests}</span></div>
                <div className="flex justify-between"><span>Menu Selection:</span> <span className="text-white capitalize font-medium">{menuTier}</span></div>
                <div className="flex justify-between"><span>Canopies:</span> <span className="text-white font-medium">{needCanopies ? `Yes (${Math.ceil(guests / 50)} Tents)` : 'No'}</span></div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50/60 border border-amber-200/50 p-4 rounded-xl text-[11px] text-amber-800 flex gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <p>Estimates generated through this terminal serve as real-time guides. Final invoices are subject to structural review via our Django control desk.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
