"use client";

import React from 'react';
import { ChefHat, Award, ShieldCheck, Heart, Sparkles, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Premium Hero Section */}
      <section className="bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white py-24 px-4 text-center relative overflow-hidden border-b border-emerald-900/40">
        {/* Decorative Grid Lines or Backdrop Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_50%)]" />
        
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Est. 2026 / Abuja Artisans</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
            Our Culinary & <span className="text-amber-500">Events Journey</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm uppercase tracking-widest font-black max-w-md mx-auto pt-1">
            Dinas Catering and Rentals Services
          </p>
        </div>
      </section>

      {/* Core Brand Narrative Grid Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-12 gap-12 items-center relative">
        <div className="absolute top-1/4 -left-12 w-80 h-80 bg-emerald-50 rounded-full blur-3xl pointer-events-none -z-10" />
        
        {/* Left Side: Brand Story */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
              Uncompromising <span className="text-emerald-900">Quality & Style</span>
            </h2>
            <div className="h-1 w-16 bg-amber-500 rounded-full" />
          </div>
          
          <div className="space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
            <p>
              Based in Abuja, Nigeria, Dinas Catering has grown into a leading name for luxury event catering and high-end rentals nationwide. We specialize in local delicacies, rich continental stews, desserts, and flawless event logistics.
            </p>
            <p>
              Whether managing a 1,000-guest wedding or cooking personalized bulk meals directly inside your kitchen, we provide premium culinary solutions that make every occasion unforgettable.
            </p>
          </div>
        </div>

        {/* Right Side: Enhanced Mosaic Geometry Display Cards */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 relative">
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 h-56 rounded-3xl shadow-xl border border-emerald-800/40 p-6 flex flex-col justify-between text-white hover:-translate-y-1 transition duration-300 group">
            <ChefHat className="w-8 h-8 text-amber-500 group-hover:scale-110 transition duration-300" />
            <div className="space-y-1">
              <span className="text-xl font-black tracking-tight block">100% Elite</span>
              <span className="text-[10px] text-emerald-200 uppercase tracking-wider font-bold">Kitchen Execution</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 h-56 rounded-3xl shadow-xl border border-amber-400/40 p-6 flex flex-col justify-between text-white mt-8 hover:-translate-y-1 transition duration-300 group">
            <Award className="w-8 h-8 text-slate-900 group-hover:scale-110 transition duration-300" />
            <div className="space-y-1">
              <span className="text-xl font-black tracking-tight block">Abuja's Best</span>
              <span className="text-[10px] text-amber-900 uppercase tracking-wider font-bold">Event Logisticians</span>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Value Pillars Slabs Layout */}
      <section className="bg-white border-y border-slate-200/60 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Pillar 1 */}
          <div className="flex gap-4 items-start p-2">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900">Premium Standards</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Carefully selected farm-fresh stock variables handled under absolute sanitary controls.</p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex gap-4 items-start p-2">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-800 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900">Hospitality Teams</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Courteous, responsive, and sharp uniforms deployed straight to your private estate setup.</p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex gap-4 items-start p-2">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900 shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900">Tailored Cuisines</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Customizable spice configurations, meal choices, and tray settings built for your crowd tier.</p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="flex gap-4 items-start p-2">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-800 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900">Surcharge Free</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Logistics setup surcharge waivers if equipment options group alongside catering pots.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
