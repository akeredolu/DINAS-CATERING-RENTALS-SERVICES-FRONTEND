"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageSquare, Shield, Info } from 'lucide-react';

export default function Footer() {
  const [activeModal, setActiveModal] = useState<'TERMS' | 'SUPPORT' | null>(null);

  // Prevent background scrolling when a modal overlay is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

  return (
    <footer className="bg-slate-900 text-slate-300 border-t-2 border-emerald-800">
      {/* Upper Content Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand & Mission Column */}
        <div className="space-y-4">
          <h3 className="text-xl font-black tracking-wider text-amber-500">
            DINA <span className="text-white text-sm font-light block">EVENTS AND CATERING SERVICES</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Abuja’s premier catering and luxury rental service. We craft unforgettable culinary experiences paired with flawless event setups for corporate functions, weddings, and private gatherings nationwide.
          </p>
          <div className="pt-2">
            <a 
              href="https://wa.me/2348000000000?text=Hello%20Dina%20Events,%20I%20need%20assistance%20with%20an%20Services."
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 border-l-2 border-amber-500 pl-3">
            Quick Links
          </h4>
          <ul className="space-y-3 text-xs font-medium">
            <li><Link href="/" className="hover:text-amber-500 transition block">Home Dashboard</Link></li>
            <li><Link href="/about" className="hover:text-amber-500 transition block">Our Story (About)</Link></li>
            <li><Link href="/catering" className="hover:text-amber-500 transition block">Catering Menus & Food Pots</Link></li>
            <li><Link href="/rentals" className="hover:text-amber-500 transition block">Event Equipment Rentals</Link></li>
            <li><Link href="/quote" className="hover:text-amber-500 transition block">Request an Instant Quote</Link></li>
          </ul>
        </div>

        {/* Corporate Legal & Support Access */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 border-l-2 border-amber-500 pl-3">
            Legal & Trust
          </h4>
          <ul className="space-y-3 text-xs font-medium">
            <li>
              <button 
                type="button"
                onClick={() => setActiveModal('TERMS')} 
                className="hover:text-amber-500 text-left transition block w-full cursor-pointer"
              >
                Terms of Service
              </button>
            </li>
            <li>
              <button 
                type="button"
                onClick={() => setActiveModal('SUPPORT')} 
                className="hover:text-amber-500 text-left transition block w-full cursor-pointer"
              >
                Customer Support & Refund Policy
              </button>
            </li>
            <li className="text-slate-500 text-[11px] pt-2 leading-relaxed">
              *Note: All equipment rentals are free of surcharge conditions if booked alongside premium catering packages.
            </li>
          </ul>
        </div>

        {/* Business Office Coordinates */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6 border-l-2 border-amber-500 pl-3">
            Corporate Office
          </h4>
          <ul className="space-y-4 text-xs text-slate-400">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>PW-Kubwa, Abuja, Nigeria</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <span>+234 800 000 0000</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <span>info@dinaeventsandcateringservices.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Lower Copyright Tier Bar */}
      <div className="bg-slate-950 text-slate-500 py-6 text-center text-xs border-t border-slate-800/60 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-amber-500 font-semibold hover:text-amber-400 transition-colors duration-200 border-b border-dashed border-amber-500/30 hover:border-amber-400">
            {new Date().getFullYear()} Dina Events and Catering Services. All rights reserved.</p>
          <div className="flex items-center gap-1.5 tracking-wide">
            <span>Engineered and Designed by</span>
            <a 
              href="https://waheed-portfolio-ruby.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-500 font-semibold hover:text-amber-400 transition-colors duration-200 border-b border-dashed border-amber-500/30 hover:border-amber-400"
            >
              Stemcodemaster
            </a>
          </div>
        </div>
      </div>

      {/* ==================== TERMS OF SERVICE MODAL OVERLAY ==================== */}
      {activeModal === 'TERMS' && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-white text-slate-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()} // Keeps clicking modal content from accidentally closing it
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-900" /> Terms of Service
              </h3>
              <button 
                type="button"
                onClick={() => setActiveModal(null)} 
                className="text-slate-400 hover:text-slate-600 font-bold text-sm bg-slate-100 px-3 py-1 rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-600">
              <p><strong>1. Booking Deadlines:</strong> General food pot orders and small scale requests must be finalized at least 72 hours before dispatch. Full event planning requests require confirmation a minimum of 2 to 4 weeks prior to the target event date.</p>
              <p><strong>2. Rental Integrity:</strong> While rental equipment metrics are calculated as free when accompanied by custom catering provisions, the client accepts total logistical accountability for structural breakage, inventory theft, or destruction of rental equipment by guests.</p>
              <p><strong>3. Payment Validation:</strong> Orders chosen via "Bank Transfer" remain strictly unconfirmed until verified manually via our Django internal auditing panel. No food assembly or equipment reservation will proceed without full initial clearing verification.</p>
            </div>
          </div>
        </div>
      )}

      {/* ==================== CUSTOMER SUPPORT MODAL OVERLAY ==================== */}
      {activeModal === 'SUPPORT' && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-white text-slate-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Info className="w-5 h-5 text-emerald-900" /> Support & Refund Guidelines
              </h3>
              <button 
                type="button"
                onClick={() => setActiveModal(null)} 
                className="text-slate-400 hover:text-slate-600 font-bold text-sm bg-slate-100 px-3 py-1 rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-600">
              <p><strong>1. Cancellation and Refunds:</strong> Cancellations made over 14 days before an event qualify for a full refund of the deposit. Cancellations logged within 7 days of the scheduled time forfeit the reservation down-payment due to immediate ingredient acquisition costs.</p>
              <p><strong>2. Dietary Customizations:</strong> All conditional ingredient constraints (allergies, vegan preferences, specific spice adjustments) must be clearly designated inside the notes segment of your quote builder submission.</p>
              <p><strong>3. Reach Support:</strong> For emergency modifications outside business operation boundaries, execute our automated WhatsApp chat system to trigger direct access to our on-duty operational supervisors.</p>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
}