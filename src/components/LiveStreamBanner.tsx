"use client";
import React, { useState, useEffect } from 'react';
import { Radio, VideoOff } from 'lucide-react';

export default function LiveStreamBanner() {
  const [isLive, setIsLive] = useState(false);
  const [streamUrl, setStreamUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamic query verification pulling parameters from our Django endpoint
    fetch('http://127.0.0.1:8000/api/live-status/')
      .then(res => res.json())
      .then(data => {
        if (data.is_live) {
          setIsLive(true);
          setStreamUrl(data.youtube_url);
        }
      })
      .catch(() => {
        console.log("Live tracking feed offline. Loading local development mock placeholder.");
        // OPTIONAL DEVELOPMENT MOCK: Uncomment the next 2 lines to force-preview the banner layout locally without Django running
        // setIsLive(true);
        // setStreamUrl("https://youtube.com"); 
      })
      .finally(() => setLoading(false));
  }, []);

  // Safe fallback guard: prevents unstyled empty rendering slots during active execution
  if (loading) return null;
  if (!isLive) return null;

  return (
    <div className="bg-slate-950 border-t-4 border-amber-500 text-white py-16 px-4 relative overflow-hidden">
      {/* Visual Ambient Blur Accent Grid */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        
        {/* Dynamic State Indicator Badge */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
          <span className="bg-red-600 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm shadow-red-900/30">
            <Radio className="w-3 h-3 text-white" /> Live Broadcaster
          </span>
        </div>

        {/* Descriptive Text Titles */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-100 tracking-tight sm:text-3xl">
            Watch Our On-Site Event Operations Live
          </h2>
          <p className="text-slate-400 text-xs font-medium">
            Live stream broadcasts directly from our central catering kitchen desks and luxury event venues.
          </p>
        </div>

        {/* Embedded Iframe Player Window Container */}
        <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800/80 group">
          {streamUrl ? (
            <iframe 
              className="w-full h-full border-0" 
              src={streamUrl.replace("watch?v=", "embed/")} 
              title="Dina Live Stream Feed" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-2 text-slate-500">
              <VideoOff className="w-8 h-8 text-slate-700 animate-pulse" />
              <p className="text-xs font-bold">Video content stream track unavailable.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
