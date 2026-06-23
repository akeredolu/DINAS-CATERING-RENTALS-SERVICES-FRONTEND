"use client";

import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface TestimonialData {
  id: number;
  name: string;
  text: string;
  rating: number;
  image: string;
}

export default function TestimonialSlider() {
  const [reviews, setReviews] = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/testimonials/');
        if (response.ok) {
          const data = await response.json();
          setReviews(data.testimonials || []);
        }
      } catch (err) {
        console.error("Failed to connect to dynamic testimonials data stream:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading || reviews.length === 0) {
    return (
      <div className="bg-white py-16 text-center text-xs text-slate-400 font-medium">
        Syncing live culinary reviews pipeline...
      </div>
    );
  }

  // Duplicate the list to ensure a gapless, endless animation loop track
  const continuousReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div className="bg-white py-16 border-y border-slate-100 overflow-hidden relative">
      
      {/* 🚀 Injecting Native Infinite Marquee CSS Animation Loops */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .infinite-scroller-track {
          display: flex;
          width: max-content;
          animation: customMarquee 30s linear infinite;
        }
        .infinite-scroller-track:hover {
          animation-play-state: paused; /* Optional: pauses slider when client hovers cursor */
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <h2 className="text-3xl font-black text-slate-900">What Our Clients Say</h2>
        <p className="text-slate-500 text-xs mt-1">Real feedback managed natively from your administrative dashboard</p>
      </div>

      {/* Main Row Frame Track Container */}
      <div className="relative w-full flex overflow-hidden mask-gradient-side-fades">
        {/* Swapped class for our bulletproof infinite-scroller-track layout handle */}
        <div className="infinite-scroller-track">
          {continuousReviews.map((rev, index) => (
            <div 
              key={`${rev.id}-${index}`} 
              className="w-[300px] sm:w-[400px] mx-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between items-center text-center shrink-0"
            >
              {/* Dynamic Customer Rating Stars Indicator */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: rev.rating || 5 }).map((_, starIdx) => (
                  <Star key={starIdx} className="w-3 h-3 fill-amber-500 text-amber-500" />
                ))}
              </div>

              {/* Centralized Text Paragraph String */}
              <p className="text-slate-600 text-xs italic leading-relaxed px-2">
                "{rev.text}"
              </p>
              
              {/* Centralized Identity Info Block Panel */}
              <div className="mt-4 pt-3 border-t border-slate-200/60 w-full flex flex-row items-center justify-center gap-3">
                {rev.image ? (
                  <img 
                    src={rev.image} 
                    alt={rev.name}
                    className="w-8 h-8 rounded-full object-cover border border-emerald-900/20 shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[10px] font-black text-emerald-900 uppercase shrink-0">
                    {rev.name.charAt(0)}
                  </div>
                )}
                
                <div className="text-left">
                  <h4 className="font-bold text-slate-900 text-xs leading-none">{rev.name}</h4>
                  <span className="text-[9px] text-emerald-800 font-bold uppercase tracking-wider block mt-1">Verified Client</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
