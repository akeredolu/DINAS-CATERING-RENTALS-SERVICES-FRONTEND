"use client";

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Sparkles, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // 🚀 REAL CONNECTION: Pointing to your Django Backend API point route
      const response = await fetch('http://localhost:8000/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset fields
      } else {
        const errorData = await response.json();
        console.error("Server execution rejected query:", errorData);
        alert("Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Communication channel failed network transit:", err);
      alert("Network connectivity issue. Check if your Django server is running.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-20 relative overflow-hidden">
      <div className="absolute top-24 left-1/4 w-96 h-96 bg-emerald-50/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-900 px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border border-emerald-200/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Consulting & Management Desk</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight sm:text-5xl">
            Let's Plan Your <span className="text-emerald-900">Event</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            Speak with our event specialists about custom menus, packages, and full-scale rental management workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Interactive Form Panel */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-200/60 transition duration-300">
            <h3 className="text-base font-black text-slate-900 uppercase tracking-wider mb-6">
              Send Us A Message
            </h3>
            
            {submitted ? (
              <div className="bg-emerald-50/80 border border-emerald-200 p-8 rounded-2xl text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-700 mx-auto" />
                <h4 className="text-lg font-black text-slate-900">Message Dispatched Smoothly</h4>
                <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                  Thank you for reaching out to Dina Catering! An automated confirmation breakdown notification has hit your email address. Our team will review your message guidelines shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="text-xs text-emerald-900 font-bold uppercase underline tracking-wider pt-2 block mx-auto hover:text-emerald-950 transition"
                >
                  Send Another Inquiry Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-900 focus:bg-white transition" 
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-900 focus:bg-white transition" 
                  />
                </div>
                
                <input 
                  type="text" 
                  placeholder="Subject" 
                  required
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-900 focus:bg-white transition" 
                />
                
                <textarea 
                  rows={5} 
                  placeholder="Describe your request..." 
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-900 focus:bg-white transition resize-none"
                />
                
                <button 
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-emerald-900 hover:bg-emerald-950 disabled:bg-slate-300 text-white text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-xl transition shadow-md shadow-emerald-950/10 cursor-pointer active:scale-98 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{submitting ? "Sending..." : "Send Message"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-slate-300 p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800">
              <h3 className="text-xs font-black text-amber-500 uppercase tracking-wider mb-6 border-l-2 border-amber-500 pl-3">
                Contact Information
              </h3>
              <ul className="space-y-4 text-xs">
                <li className="flex items-center gap-3.5">
                  <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="font-medium">+234 803 752 3826</span>
                </li>
                <li className="flex items-center gap-3.5">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="font-medium">info@dinacatering.com</span>
                </li>
                <li className="flex items-start gap-3.5">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">Plot 123 Event Avenue, Wuse II, Abuja, Nigeria</span>
                </li>
                <li className="flex items-start gap-3.5">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">
                    Mon - Fri (8AM - 6PM) <br /> Sat (9AM - 5PM)
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50 border border-emerald-200/50 p-6 rounded-3xl text-center space-y-4">
              <div className="space-y-1">
                <h4 className="font-black text-emerald-950 text-sm">Need Immediate Assistance?</h4>
                <p className="text-[11px] text-emerald-800 leading-relaxed font-medium">
                  Chat instantly with our culinary support specialists live on WhatsApp.
                </p>
              </div>
              <a 
                href="https://wa.me" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider py-3.5 rounded-xl transition w-full shadow-md shadow-emerald-700/10 cursor-pointer active:scale-98"
              >
                <MessageSquare className="w-4 h-4 text-white shrink-0" />
                <span>Chat On WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
