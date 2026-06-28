"use client";

import React, { useState, useEffect } from 'react'; 
import Link from 'next/link';

// Core Global State Context Layer & Sub-Component Component Imports
import { useCart } from '@/context/CartContext';
import LiveStreamBanner from '@/components/LiveStreamBanner';
import TestimonialSlider from '@/components/TestimonialSlider';

// Lucide Icons for Premium UI Accents
import { 
  ChefHat, 
  Layers, 
  Calculator, 
  Sparkles, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare,
  UtensilsCrossed,
  Truck,
  ShieldCheck,
  CreditCard,
  Landmark,
  Plus,
  Minus, 
  Trash2,
  Calendar,
  User,
  FileText,
  UserCheck,
  ChevronLeft,    
  ChevronRight
} from 'lucide-react';

// Complete Comprehensive Datasets
const eventTypes = [
  "Weddings",
  "Corporate Events",
  "Birthdays",
  "Conferences",
  "Outdoor Festivals",
  "Private Residential Dinners",
];

// Automatically shifts between your live Render endpoint and local development environments cleanly
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://dinas-catering-rentals-services-backend.onrender.com";

export default function IntegratedCorporateHub() {

  const { addToCart, cart, getCartTotal, clearCart, removeFromCart, updateQuantity } = useCart();

  // Handles increasing cart item counts securely
  const handleIncrementItem = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    e.stopPropagation(); 
    
    const isByDozenFlag = item.isByDozen || false;
    const currentQty = Number(item.quantity) || 1;
    
    updateQuantity(item.id, isByDozenFlag, currentQty + 1);
  };

  // Handles decreasing cart item counts safely with propagation block
  const handleDecrementItem = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    e.stopPropagation(); 
    
    const isByDozenFlag = item.isByDozen || false;
    const currentQty = Number(item.quantity) || 1;
    
    if (currentQty <= 1) {
      removeFromCart(item.id, isByDozenFlag); 
    } else {
      updateQuantity(item.id, isByDozenFlag, currentQty - 1);
    }
  };

  // --- Form & Interaction State Managers ---
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteLoading, setQuoteLoading] = useState(false);
  
  const [quoteForm, setQuoteForm] = useState({
    name: '', 
    email: '', 
    phone: '', 
    guestCount: 100, 
    eventType: 'Weddings', 
    serviceType: 'DELIVERY', 
    eventDate: '',   
    address: '',    
    notes: '',
    requestedMenuItemsInput: '',
    requestedRentalItemsInput: '',
  }); 

  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'ONLINE' | 'TRANSFER'>('ONLINE');
  const [shippingForm, setShippingForm] = useState({ name: '', email: '', phone: '', address: '', delivery_date: ''});

  // --- Live Dynamic Marketplace Catalog State Managers ---
  const [liveFoodMenu, setLiveFoodMenu] = useState<any[]>([]);
  const [liveRentalInventory, setLiveRentalInventory] = useState<any[]>([]);
  const [catalogLoading, setCatalogLoading] = useState<boolean>(true);

  const [liveHeroSlides, setLiveHeroSlides] = useState<any[]>([
    { 
      id: 'fb-1', 
      imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200', 
      altText: 'Premium Catering Setup'
    },
    { 
      id: 'fb-2', 
      imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200', 
      altText: 'Luxury Tent Rentals'
    },
    { 
      id: 'fb-3', 
      imageUrl: 'https://images.unsplash.com/photo-1547573854-74d2a71d0826?q=80&w=1200', 
      altText: 'Gourmet Food Pots'
    }
  ]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Unified Catalog Streamer & Hero Picture Aggregator
  useEffect(() => {
    const fetchMarketplaceData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/marketplace-catalog/`);
        if (response.ok) {
          const data = await response.json();
          setLiveFoodMenu(data.foodMenu || []);
          setLiveRentalInventory(data.rentalInventory || []);
          
          if (data.heroSlides && data.heroSlides.length > 0) {
            setLiveHeroSlides(data.heroSlides);
          }
        }
      } catch (err) {
        console.error("Failed to stream dynamic catalog data matrices:", err);
      } finally {
        setCatalogLoading(false);
      }
    };
    fetchMarketplaceData();
  }, []);

  // Automatic Hero Carousel Cycle Loop
  useEffect(() => {
    if (liveHeroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % liveHeroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [liveHeroSlides]);

  const handlePrevSlide = () => {
    setCurrentHeroIndex((prev) => (prev === 0 ? liveHeroSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % liveHeroSlides.length);
  };

  // --- Multi-Step Dynamic Calculator Pricing Logic ---
  const [calcGuests, setCalcGuests] = useState(100);
  const [calcMenuTier, setCalcMenuTier] = useState('standard');
  const [calcNeedCanopies, setCalcNeedCanopies] = useState(false);
  const [calculatorTally, setCalculatorTally] = useState<number | null>(null);
  const [liveRates, setLiveRates] = useState({
    standard_rate: 2500,
    premium_rate: 4500,
    executive_rate: 7500,
    canopy_rate: 15000
  });

  useEffect(() => {
    const fetchPricingConfig = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/pricing-config/`);
        if (response.ok) {
          const data = await response.json();
          setLiveRates(data);
        }
      } catch (err) {
        console.error("Failed to fetch live admin matrix variables parameters:", err);
      }
    };
    fetchPricingConfig();
  }, []);

  // Paystack Script Injection Engine Layer
  useEffect(() => {
    if (document.getElementById('paystack-sdk-node')) return;

    const script = document.createElement('script');
    script.id = 'paystack-sdk-node';
    script.src = 'https://js.paystack.co/v2/inline.js'; 
    script.async = true;
    
    script.onload = () => {
      console.log("🚀 Paystack V2 engine initialized smoothly.");
    };

    script.onerror = () => {
      console.error("❌ Critical: Paystack core CDN script rejected connection.");
    };

    document.body.appendChild(script);
    return () => {
      const existingScript = document.getElementById('paystack-sdk-node');
      if (existingScript) document.body.removeChild(existingScript);
    };
  }, []);

  const runCalculatorFormula = (e: React.FormEvent) => {
    e.preventDefault();
    
    const standardRate = Number(liveRates.standard_rate) || 2500;
    const premiumRate = Number(liveRates.premium_rate) || 4500;
    const executiveRate = Number(liveRates.executive_rate) || 7500;
    const canopyRate = Number(liveRates.canopy_rate) || 15000;

    const perGuestRate = 
      calcMenuTier === 'premium' ? premiumRate : 
      calcMenuTier === 'executive' ? executiveRate : 
      standardRate;
      
    const baseFoodCost: number = Number(calcGuests) * perGuestRate;
    let logisticsFee: number = 0;
    
    if (calcNeedCanopies) {
      const tentCount = Math.ceil(calcGuests / 50);
      logisticsFee = tentCount * canopyRate;
    }
    
    setCalculatorTally(Number(baseFoodCost + logisticsFee));
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteLoading(true);

    const rawMenu = quoteForm.requestedMenuItemsInput.trim();
    const rawRental = quoteForm.requestedRentalItemsInput.trim();
    const rawNotes = quoteForm.notes.trim();

    let finalMenuItems = rawMenu || "Bespoke Custom Menu Requested";
    let finalRentalItems = rawRental || "Bespoke Rentals Requested";

    if (rawNotes) {
      const formattedNotesBlock = `\n\n--- ADDITIONAL SETUP NOTES & TIMELINE ---\n${rawNotes}`;
      finalMenuItems += formattedNotesBlock;
      finalRentalItems += formattedNotesBlock;
    }

    const payload = {
      name: quoteForm.name,
      email: quoteForm.email,
      phone: quoteForm.phone,
      eventType: quoteForm.eventType,
      eventDate: quoteForm.eventDate,
      address: quoteForm.address,
      guestCount: quoteForm.guestCount,
      serviceType: quoteForm.serviceType,
      menuItems: finalMenuItems,
      requested_menu_items: finalMenuItems,
      rentalItems: finalRentalItems,
      requested_rental_items: finalRentalItems
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/quotes/submit/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setQuoteSubmitted(true);
        setQuoteForm(prev => ({
          ...prev,
          name: '', email: '', phone: '', address: '', notes: '',
          requestedMenuItemsInput: '', requestedRentalItemsInput: ''
        }));
      }
    } catch (err) {
      console.error("Transmission interface failure:", err);
      setQuoteSubmitted(true); 
    } finally {
      setQuoteLoading(false);
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your checkout cart basket is completely empty.");
      return;
    }
    setCheckoutLoading(true);

    const orderPayloadBase = {
      client_name: shippingForm.name,
      client_email: shippingForm.email,
      client_phone: shippingForm.phone,
      delivery_address: shippingForm.address,
      payment_method: paymentMethod,
      total_amount: getCartTotal(),
      items: cart.map(item => {
        let cleanNumericId = Number(item.id);
        if (item.isRental) {
          cleanNumericId = cleanNumericId - 2000;
        } else {
          cleanNumericId = cleanNumericId - 1000;
        }
        return {
          item: cleanNumericId,
          quantity: Number(item.quantity),
          price: Number(item.price),
          is_by_dozen: item.isByDozen || false
        };
      })
    };

    const submitOrderToBackend = async (payloadWithPaymentInfo: any) => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/orders/create/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payloadWithPaymentInfo)
        });

        if (res.ok) {
          clearCart();
          setCheckoutComplete(true);
        } else {
          alert("Order validation failed. Please check your data inputs.");
        }
      } catch (err) {
        console.error("Critical Connection Failure to Django:", err);
      } finally {
        setCheckoutLoading(false);
      }
    };

    if (paymentMethod === 'ONLINE') {
      // @ts-ignore
      if (typeof window !== "undefined" && window.PaystackPop) {
        try {
          // @ts-ignore
          const popup = new window.PaystackPop();
          popup.newTransaction({
            key: 'pk_test_07ca2f38b19da687aae108a0148f5652e7c24be6', 
            email: shippingForm.email,
            amount: getCartTotal() * 100, 
            currency: 'NGN',
            onSuccess: function (response: any) {
              submitOrderToBackend({
                ...orderPayloadBase,
                payment_status: true,
                paystack_reference: response.reference,
                status: 'CONFIRMED'
              });
            },
            onCancel: function () {
              setCheckoutLoading(false);
              alert('Transaction terminal closed. Order checkout configuration canceled.');
            }
          });
        } catch (paystackInitError) {
          setCheckoutLoading(false);
        }
      } else {
        setCheckoutLoading(false);
        alert("Paystack secure terminal failed to initialize.");
      }
    } else {
      await submitOrderToBackend({ 
        ...orderPayloadBase, 
        payment_status: false, 
        paystack_reference: "BANK_TRANSFER_PENDING",
        status: 'PENDING' 
      });
    }
  };

  return ( 
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      {/* 1. Dynamic Live Stream Banner Layer */}
      <LiveStreamBanner />

      {/* 2. Premium Hero Showcase Section */}
      <section className="relative w-full h-[600px] md:h-[650px] flex items-center justify-center text-white overflow-hidden bg-slate-950">
        {liveHeroSlides.map((slide, index) => (
          <div
            key={slide.id || index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentHeroIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            } transform transition-transform duration-[5000ms]`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.imageUrl} 
              alt={slide.altText || "Dina Catering Slide"}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/80 z-10"></div>
        <div className="absolute inset-0 bg-emerald-950/20 z-10 mix-blend-color-burn"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-20 px-4 space-y-6 select-none">
          <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-800/60 px-4 py-1.5 rounded-full backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
              Abuja's Premier Culinary Mastermind
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none drop-shadow-md">
            Exquisite Catering & Luxury <br />
            <span className="text-amber-500">Event Rental Services</span>
          </h1>
          
          <p className="text-sm md:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow">
            From single gourmet party food pots delivered to your doorstep to large-scale multi-tier royal banquets, we combine fluid e-commerce booking pipelines with tailored automated quoting workflows.
          </p>
          
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a href="#quote-form" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-8 py-3.5 rounded-xl transition shadow-lg text-xs uppercase tracking-wider">
              Book Our Services
            </a>
            <a href="#catering-menu" className="border border-slate-400 bg-slate-950/40 hover:bg-white hover:text-slate-950 font-bold px-8 py-3.5 rounded-xl transition text-xs text-slate-100 uppercase tracking-wider backdrop-blur-sm">
              Explore / Order our Services
            </a>
          </div>
        </div>

        {liveHeroSlides.length > 1 && (
          <>
            <button 
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-900/60 hover:bg-amber-500 hover:text-slate-950 border border-slate-700/50 text-white transition cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-900/60 hover:bg-amber-500 hover:text-slate-950 border border-slate-700/50 text-white transition cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
              {liveHeroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHeroIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentHeroIndex ? 'w-6 bg-amber-500' : 'w-2 bg-slate-500/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>
      

      {/* 3. Event Types Matrix Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10 max-w-xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Events We Service Flawlessly</h2>
          <p className="text-xs text-slate-500 mt-1">We bring custom catering setups and logistical infrastructure directly to your venue location anywhere in Abuja and nationwide.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {eventTypes.map((type, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl border border-slate-200/60 text-center shadow-sm hover:border-emerald-900 hover:shadow-md transition cursor-pointer group">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-900 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-900 group-hover:text-amber-500 transition">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <h4 className="font-black text-slate-800 text-xs sm:text-sm tracking-tight">{type}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Strategic Corporate Capabilities Showcase */}
      <section className="bg-emerald-950 text-white py-16 px-4 border-y border-emerald-900 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-emerald-900/30 border border-emerald-800/80 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-900 flex items-center justify-center"><ChefHat className="w-5 h-5 text-amber-500" /></div>
            <h3 className="text-base font-bold text-white">Gourmet Catering Pots</h3>
            <p className="text-xs text-slate-300 leading-relaxed">Order large party dishes, finger foods, and traditional local swallows safely packed and dispatched under strict hygienic monitoring protocols.</p>
          </div>
          <div className="p-6 bg-emerald-900/30 border border-emerald-800/80 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-900 flex items-center justify-center"><Truck className="w-5 h-5 text-amber-500" /></div>
            <h3 className="text-base font-bold text-white">Premium Home Chef Service</h3>
            <p className="text-xs text-slate-300 leading-relaxed">Our culinary specialists come straight into your residential workspace to manage meal prep arrays, seasoning operations, and large gatherings cleanly.</p>
          </div>
          <div className="p-6 bg-emerald-900/30 border border-emerald-800/80 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-900 flex items-center justify-center"><Layers className="w-5 h-5 text-amber-500" /></div>
            <h3 className="text-base font-bold text-white">Free Bundled Logistics</h3>
            <p className="text-xs text-slate-300 leading-relaxed">Secure massive venue architectural resources. All rental supplies include absolute zero surcharge when combined with high-tier catering packages.</p>
          </div>
        </div>
      </section>

      {/* 5. Interactive Pricing Estimator Matrix Tool */}
      <section id="budget-calculator" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12 max-w-xl mx-auto space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Interactive Price Matrix</h2>
          <p className="text-xs text-slate-500">Formulate instant cost assessments dynamically based on guest demographics and infrastructure variables before placing orders.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          <form onSubmit={runCalculatorFormula} className="md:col-span-3 bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <label htmlFor="hub-guest-slider">Expected Target Guests</label>
                <span className="text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded font-black">{calcGuests} Attendees</span>
              </div>
              <input 
                id="hub-guest-slider"
                type="range" min="20" max="1000" step="10" value={calcGuests} 
                onChange={(e) => setCalcGuests(Number(e.target.value))}
                className="w-full accent-emerald-900 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Menu Composition Plan</label>
              <select 
                value={calcMenuTier} onChange={(e) => setCalcMenuTier(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-900"
              >
                <option value="standard">Standard Native Tier (₦{Number(liveRates.standard_rate).toLocaleString()} / head)</option>
                <option value="premium">Premium Continental Buffet (₦{Number(liveRates.premium_rate).toLocaleString()} / head)</option>
                <option value="executive">Executive Imperial Banquet (₦{Number(liveRates.executive_rate).toLocaleString()} / head)</option>
              </select>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-xs font-bold text-slate-900 block">Deploy Canopy Tent Infrastructure?</label>
                <span className="text-[10px] text-slate-400 block">Auto-allocates heavy canvas structures safely parsed per 50 guests.</span>
              </div>
              <input 
                type="checkbox" checked={calcNeedCanopies} onChange={(e) => setCalcNeedCanopies(e.target.checked)}
                className="w-5 h-5 rounded accent-emerald-900 cursor-pointer"
              />
            </div>

            <button type="submit" className="w-full bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-bold py-4 rounded-xl transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer">
              <Calculator className="w-4 h-4 text-amber-500" /> Calculate Budget Estimate Tally
            </button>
          </form>

          <div className="md:col-span-2 space-y-4">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 rounded-2xl border border-slate-800 shadow-md relative overflow-hidden">
              <h3 className="text-xs font-black uppercase text-amber-500 tracking-widest mb-4">Calculation Tally Result</h3>
              
              {calculatorTally !== null ? (
                <div className="space-y-4">
                  <div>
                    <span className="text-4xl font-black text-white">
                      ₦{Number(calculatorTally).toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">Projected Grand Tally</span>
                  </div>
                  <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-2">
                    <div className="flex justify-between"><span>Guest Matrix:</span> <span className="text-white font-bold">{calcGuests}</span></div>
                    <div className="flex justify-between"><span>Menu Configuration:</span> <span className="text-white capitalize font-bold">{calcMenuTier}</span></div>
                    <div className="flex justify-between"><span>Logistics Allocation:</span> <span className="text-white font-bold">{calcNeedCanopies ? 'Heavy Tents Active' : 'Catering Only'}</span></div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-slate-500 space-y-2">
                  <Calculator className="w-8 h-8 text-slate-700 mx-auto animate-bounce" />
                  <p className="text-xs">Adjust configurations and press compute to compile your real-time estimation dashboard.</p>
                </div>
              )}
            </div>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-[10px] sm:text-xs text-amber-800 flex gap-2">
              <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>Estimates are calculated instantly based on native standard pricing rates. Final administrative numbers are locked following an review via the dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Marketplace: Gourmet Catering Pots Catalog */}
      <section id="catering-menu" className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12 text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-3xl font-black text-slate-900">Catering Catalog</h2>
          <p className="text-xs text-slate-500">Mix and match premium large food pots directly into your stateful active cart asset terminal.</p>
        </div>

        {catalogLoading ? (
          <div className="text-center py-12 text-xs text-slate-400 font-bold uppercase tracking-widest animate-pulse">
            Syncing live catering kitchen menu inventory...
          </div>
        ) : liveFoodMenu.length === 0 ? (
          <div className="text-center py-12 text-xs text-slate-500 font-medium bg-slate-100 rounded-2xl border border-dashed border-slate-200">
            No culinary dishes are configured inside your admin panel yet.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveFoodMenu.map((item, index) => (
              <div 
                key={item.id} 
                style={{ animationDelay: `${index * 75}ms` }}
                className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm flex flex-col justify-between transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-emerald-800/30 group animate-in fade-in slide-in-from-bottom-4"
              >
                <div className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-52 object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                    onError={(e: any) => {
                      e.target.src = 'https://unsplash.com';
                    }}
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm text-amber-500 font-black text-[9px] tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">
                    Fresh Dispatch
                  </span>
                </div>
                
                <div className="p-6 space-y-2 flex-grow transition-colors duration-200 group-hover:bg-slate-50/30">
                  <h3 className="text-base font-bold text-slate-900 leading-tight group-hover:text-emerald-900 transition-colors duration-200">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
                
                <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between transition-colors duration-200 group-hover:bg-slate-50/30">
                  <div>
                    <span className="text-xl font-black text-slate-900">₦{(Number(item.price) || 0).toLocaleString()}</span>
                    <span className="text-[9px] text-slate-400 block">Per Unit Base</span>
                  </div>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart({ 
                        id: Number(item.id), // 🟢 FIXED: Keeps original ID intact to connect with CartContext
                        name: item.name, 
                        price: Number(item.price) || 0, 
                        quantity: 1, 
                        image: item.img, 
                        isRental: false,
                        isByDozen: false
                      });
                    }}
                    className="bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-500" /> 
                    <span>Add Pot Item</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 7. Logistics Section: Event Rentals Matrix */}
      <section id="rental-menu" className="max-w-7xl mx-auto px-4 py-16 bg-slate-900 text-white rounded-3xl my-10 shadow-2xl overflow-hidden relative border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="mb-12 text-center max-w-xl mx-auto space-y-2 relative z-10">
          <h2 className="text-3xl font-black text-white tracking-tight">Event Supplies & Rentals</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Secure high-grade canopies, porcelain dinnerware sets, and sound structures dynamically synced directly from our logistics warehouse inventory.
          </p>
        </div>

        {catalogLoading ? (
          <div className="text-center py-24 text-xs text-slate-500 font-bold uppercase tracking-widest animate-pulse flex flex-col items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Syncing live logistics inventory list...</span>
          </div>
        ) : liveRentalInventory.length === 0 ? (
          <div className="text-center py-16 text-xs text-slate-400 font-medium bg-slate-950/50 border border-slate-800 rounded-2xl max-w-md mx-auto">
            No dynamic logistical hardware currently published.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 relative z-10">
            {liveRentalInventory.map((item) => (
              <div 
                key={item.id} 
                className="bg-slate-950/80 rounded-2xl border border-slate-800/80 p-4 flex flex-col justify-between space-y-4 hover:border-slate-700/80 hover:bg-slate-950 transition-all duration-300 group hover:shadow-xl hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="w-full h-40 object-cover rounded-xl overflow-hidden bg-slate-900 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-105" 
                      onError={(e: any) => {
                        e.target.src = 'https://unsplash.com';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-100 group-hover:text-amber-400 transition-colors duration-200 line-clamp-1">{item.name}</h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2 min-h-[32px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-900">
                  <div>
                    <span className="text-sm font-black text-amber-500">₦{(Number(item.price) || 0).toLocaleString()}</span>
                    <span className="text-[9px] text-slate-500 block">Rental Fee</span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => addToCart({
                      id: Number(item.id), // 🟢 FIXED: Keeps original ID intact to connect with CartContext
                      name: item.name,
                      price: Number(item.price) || 0,
                      quantity: 1,
                      image: item.img,
                      isRental: true,
                      isByDozen: false
                    })}
                    className="bg-emerald-900 hover:bg-emerald-800 active:scale-95 text-white text-[11px] font-bold px-3 py-2 rounded-xl transition-all"
                  >
                    <span>Rent Item</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

{/* 8. Feedback Loop Display Block */}
      <section className="py-16 bg-white border-y border-slate-200/50">
        <TestimonialSlider />
      </section>

      {/* 9. Bespoke Custom Quote Form Workflow Section */}
      <section id="quote-form" className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-900 via-amber-500 to-emerald-900"></div>
          
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Request a Custom Event Proposal</h2>
            <p className="text-xs text-slate-500">
              Planning a royal wedding banquet, high-profile corporate summit, or large indoor assembly? Send your operational variables directly to our administrators.
            </p>
          </div>

          {quoteSubmitted ? (
            <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-900 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">Proposal Request Transmitted</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Your event parameters have been securely compiled into our database. Our logistics coordinators will finalize the balance matrix and call you shortly.
                </p>
              </div>
              <button 
                type="button" 
                onClick={() => setQuoteSubmitted(false)}
                className="text-xs font-bold text-emerald-900 underline hover:text-emerald-950 transition cursor-pointer"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleQuoteSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Full Name / Contact Person</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input 
                      type="text" required placeholder="e.g. Waheed Adedayo"
                      value={quoteForm.name} onChange={(e) => setQuoteForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-xs focus:outline-none focus:border-emerald-900 text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input 
                      type="email" required placeholder="name@company.com"
                      value={quoteForm.email} onChange={(e) => setQuoteForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-xs focus:outline-none focus:border-emerald-900 text-slate-800"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input 
                      type="tel" required placeholder="080XXXXXXXX"
                      value={quoteForm.phone} onChange={(e) => setQuoteForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-xs focus:outline-none focus:border-emerald-900 text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Expected Guests</label>
                  <div className="relative">
                    <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input 
                      type="number" required min="10"
                      value={quoteForm.guestCount} onChange={(e) => setQuoteForm(prev => ({ ...prev, guestCount: Number(e.target.value) }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-xs focus:outline-none focus:border-emerald-900 text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Target Event Date</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input 
                      type="date" required
                      value={quoteForm.eventDate} onChange={(e) => setQuoteForm(prev => ({ ...prev, eventDate: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-xs focus:outline-none focus:border-emerald-900 text-slate-800"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Event Setup Category</label>
                  <select 
                    value={quoteForm.eventType} onChange={(e) => setQuoteForm(prev => ({ ...prev, eventType: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-900 text-slate-800 font-medium"
                  >
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Operational Strategy Plan</label>
                  <select 
                    value={quoteForm.serviceType} onChange={(e) => setQuoteForm(prev => ({ ...prev, serviceType: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-900 text-slate-800 font-medium"
                  >
                    <option value="DELIVERY">Standard Dispatch Drop-off Logistics</option>
                    <option value="BUFFET_SERVICE">Complete Traditional Live Buffet Serving Infrastructure</option>
                    <option value="PLATED_SERVICE">Premium Corporate Multi-Course Plated Service Array</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Venue Full Address (Abuja / Nationwide Location)</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input 
                    type="text" required placeholder="e.g. Garki Area 11, Abuja Venue Hub"
                    value={quoteForm.address} onChange={(e) => setQuoteForm(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-xs focus:outline-none focus:border-emerald-900 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Custom Menu Requests / Food Preferences</label>
                  <textarea 
                    rows={3} placeholder="List out specific traditional local dishes, custom soups, cocktails, desserts, or finger foods required..."
                    value={quoteForm.requestedMenuItemsInput} onChange={(e) => setQuoteForm(prev => ({ ...prev, requestedMenuItemsInput: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs focus:outline-none focus:border-emerald-900 text-slate-800 resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Logistical Supplies & Architectural Rentals Required</label>
                  <textarea 
                    rows={3} placeholder="List specific canopies, standard luxury cooling units, gold banquet dior chairs, or fine tableware arrangements requested..."
                    value={quoteForm.requestedRentalItemsInput} onChange={(e) => setQuoteForm(prev => ({ ...prev, requestedRentalItemsInput: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs focus:outline-none focus:border-emerald-900 text-slate-800 resize-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Additional Timelines or Structural Notes</label>
                <textarea 
                  rows={2} placeholder="Any layout instructions, dynamic staging notes, or special schedule requirements for our catering squad..."
                  value={quoteForm.notes} onChange={(e) => setQuoteForm(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs focus:outline-none focus:border-emerald-900 text-slate-800 resize-none"
                />
              </div>

              <button 
                type="submit" disabled={quoteLoading}
                className="w-full bg-emerald-900 hover:bg-emerald-950 text-white font-black text-xs uppercase tracking-wider py-4 rounded-xl transition duration-200 shadow-md disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {quoteLoading ? "Transmitting Proposal Matrices..." : "Transmit Proposal Request to Admin"}
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 10. Core Unified Shopping Cart & Checkout Terminal Segment */}
      <section id="checkout-cart" className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-200">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Active Shopping Cart Summary Module */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-900" />
                  <h3 className="font-black text-slate-900 tracking-tight text-lg">Your Selected Orders Matrix</h3>
                </div>
                <span className="text-xs font-bold bg-slate-100 px-2.5 py-1 rounded-full text-slate-600">
                  {cart.length} Core Package Rows
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <ShoppingBag className="w-10 h-10 text-slate-200 mx-auto" />
                  <p className="text-xs font-medium text-slate-400">Your stateful active shopping basket is entirely vacant.</p>
                  <a href="#catering-menu" className="inline-block bg-slate-900 text-white font-bold text-[11px] px-4 py-2 rounded-lg hover:bg-slate-800 transition">
                    Browse Catering Inventory
                  </a>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.isByDozen}`} className="py-4 flex items-center justify-between gap-4 group">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={item.image} alt={item.name} 
                          className="w-12 h-12 object-cover rounded-xl border border-slate-100 shrink-0" 
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm leading-tight">{item.name}</h4>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {item.isRental ? "Hardware Equipment Asset" : "Culinary Gourmet Dish Pack"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 shrink-0">
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg">
                          <button 
                            onClick={(e) => handleDecrementItem(e, item)}
                            className="p-1 rounded text-slate-500 hover:bg-white hover:text-slate-900 transition active:scale-90 cursor-pointer"
                            aria-label="Decrement item count"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black text-slate-800 min-w-[16px] text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={(e) => handleIncrementItem(e, item)}
                            className="p-1 rounded text-slate-500 hover:bg-white hover:text-slate-900 transition active:scale-90 cursor-pointer"
                            aria-label="Increment item count"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right min-w-[80px]">
                          <span className="text-xs font-black text-slate-900 block">
                            ₦{(Number(item.price) * Number(item.quantity)).toLocaleString()}
                          </span>
                          <span className="text-[9px] text-slate-400 block">
                            ₦{Number(item.price).toLocaleString()} base
                          </span>
                        </div>

                        <button 
                          onClick={() => removeFromCart(item.id, item.isByDozen || false)}
                          className="text-slate-300 hover:text-rose-600 p-1.5 transition cursor-pointer"
                          aria-label="Remove item completely"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 flex items-center justify-between">
                    <button 
                      onClick={() => clearCart()}
                      className="text-xs font-bold text-slate-400 hover:text-rose-600 transition flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Purge Entire Basket Summary
                    </button>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block font-medium">Subtotal Tally Balance</span>
                      <span className="text-xl font-black text-emerald-900">₦{getCartTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Paystack Checkout Terminal Panel */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
              <h3 className="font-black tracking-tight text-base border-b border-slate-800 pb-3 mb-4 flex items-center gap-2 text-slate-100">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> Administrative Gateway Terminal
              </h3>

              {checkoutComplete ? (
                <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in-95">
                  <div className="w-12 h-12 bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-800">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Order Vaulted Successfully</h4>
                    <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                      Your commercial payload has passed server filters safely. Check your email inbox for an automated ledger invoice.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 block">Recipient Full Name</label>
                    <input 
                      type="text" required placeholder="e.g. Waheed Adedayo"
                      value={shippingForm.name} onChange={(e) => setShippingForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-500 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 block">Billing Email</label>
                    <input 
                      type="email" required placeholder="name@domain.com"
                      value={shippingForm.email} onChange={(e) => setShippingForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-500 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 block">Operational Phone Link</label>
                    <input 
                      type="tel" required placeholder="080XXXXXXXX"
                      value={shippingForm.phone} onChange={(e) => setShippingForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-500 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 block">Abuja Logistics Delivery Address</label>
                    <input 
                      type="text" required placeholder="Suite / House / Street Details"
                      value={shippingForm.address} onChange={(e) => setShippingForm(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-500 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 block">Required Delivery/Setup Timestamp</label>
                    <div className="relative">
                      <Clock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                      <input 
                        type="datetime-local" required
                        value={shippingForm.delivery_date} onChange={(e) => setShippingForm(prev => ({ ...prev, delivery_date: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:border-amber-500 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-[11px] font-bold text-slate-300 block">Settlement Architecture Pipeline</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button" onClick={() => setPaymentMethod('ONLINE')}
                        className={`p-3 rounded-xl border text-left transition relative cursor-pointer ${
                          paymentMethod === 'ONLINE' ? 'border-amber-500 bg-amber-500/10 text-white' : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-amber-500 mb-1" />
                        <span className="text-[11px] font-black block leading-tight">Paystack SDK</span>
                        <span className="text-[9px] text-slate-400 block mt-0.5">Card / USSD / QR</span>
                      </button>

                      <button
                        type="button" onClick={() => setPaymentMethod('TRANSFER')}
                        className={`p-3 rounded-xl border text-left transition relative cursor-pointer ${
                          paymentMethod === 'TRANSFER' ? 'border-amber-500 bg-amber-500/10 text-white' : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <Landmark className="w-4 h-4 text-amber-500 mb-1" />
                        <span className="text-[11px] font-black block leading-tight">Bank Transfer</span>
                        <span className="text-[9px] text-slate-400 block mt-0.5">Manual Audit Node</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
                    <div className="flex justify-between"><span>Active Basket Items:</span> <span className="text-white font-bold">{cart.reduce((acc, curr) => acc + curr.quantity, 0)} Units</span></div>
                    <div className="flex justify-between text-white font-black text-xs pt-1">
                      <span>Total Terminal Due:</span> 
                      <span className="text-amber-500">₦{getCartTotal().toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    type="submit" disabled={checkoutLoading || cart.length === 0}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl transition duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-1.5 shadow-md mt-2"
                  >
                    {checkoutLoading ? "Compiling Order Array..." : paymentMethod === 'ONLINE' ? "Initialize Paystack Direct Engine" : "Submit Pending Transfer Record"}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}