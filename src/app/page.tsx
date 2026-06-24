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

  // Handles decreasing cart item counts safely
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
    
    footerName: '',
    footerEmail: '',
    footerMessage: '',
    footerMessageSubmitted: false,
    footerMessageLoading: false
  }); 

  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'ONLINE' | 'TRANSFER'>('ONLINE');
  const [shippingForm, setShippingForm] = useState({ name: '', email: '', phone: '', address: '' });

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

  // Fallback fallback URL configuration
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dinas-catering-rentals-services-backend.onrender.com';

  // Unified Catalog Streamer & Hero Picture Aggregator
  useEffect(() => {
    const fetchMarketplaceData = async () => {
      try {
        // 🟢 FIXED: Production URL binding + cache busting logic
        const response = await fetch(`${API_BASE_URL}/api/marketplace-catalog/`, {
          cache: 'no-store'
        });
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
  }, [API_BASE_URL]);

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
        // 🟢 FIXED: Linked to live production backend environment
        const response = await fetch(`${API_BASE_URL}/api/pricing-config/`, {
          cache: 'no-store'
        });
        if (response.ok) {
          const data = await response.json();
          setLiveRates(data);
        }
      } catch (err) {
        console.error("Failed to fetch live admin matrix variables parameters:", err);
      }
    };
    fetchPricingConfig();
  }, [API_BASE_URL]);

  // Paystack Script Injection
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

  // --- Multi-Step Quote Submission Handler ---
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
      // 🟢 FIXED: production URL targeting
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
    } finally {
      setQuoteLoading(false);
    }
  };

  // --- Unified E-Commerce Checkout System ---   
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
        // 🟢 FIXED: Dynamic endpoint target
        const res = await fetch(`${API_BASE_URL}/api/orders/create/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payloadWithPaymentInfo)
        });

        if (res.ok) {
          clearCart();
          setCheckoutComplete(true);
        } else {
          const errorData = await res.json();
          console.error("Django API Validation Exception Matrix:", errorData);
          alert("Order validation failed. Please check your data inputs.");
        }
      } catch (err) {
        console.error("Critical Connection Failure to Django:", err);
        alert("Could not reach backend application network node.");
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
              const authenticatedOnlinePayload = {
                ...orderPayloadBase,
                payment_status: true,
                paystack_reference: response.reference,
                status: 'CONFIRMED'
              };
              submitOrderToBackend(authenticatedOnlinePayload);
            },
            onCancel: function () {
              setCheckoutLoading(false);
              alert('Transaction terminal closed. Order checkout configuration canceled.');
            }
          });
        } catch (paystackInitError) {
          setCheckoutLoading(false);
          console.error("Paystack V2 Popup engine crash:", paystackInitError);
        }
      } else {
        setCheckoutLoading(false);
        alert("Paystack secure terminal failed to initialize. Verify network availability.");
      }
    } else {
      const automatedTransferPayload = { 
        ...orderPayloadBase, 
        payment_status: false, 
        paystack_reference: "BANK_TRANSFER_PENDING",
        status: 'PENDING' 
      };
      await submitOrderToBackend(automatedTransferPayload);
    }
  };

  return ( 
    <>
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
            <img src={slide.imageUrl} alt={slide.altText || "Dina Catering"} className="w-full h-full object-cover object-center" />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/80 z-10"></div>
        <div className="absolute inset-0 bg-emerald-950/20 z-10 mix-blend-color-burn"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-20 px-4 space-y-6 select-none">
          <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-800/60 px-4 py-1.5 rounded-full backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">Abuja's Premier Culinary Mastermind</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none drop-shadow-md">
            Exquisite Catering & Luxury <br /> <span className="text-amber-500">Event Rental Services</span>
          </h1>
          
          <p className="text-sm md:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow">
            From single gourmet party food pots delivered to your doorstep to large-scale multi-tier royal banquets, we combine fluid e-commerce booking pipelines with tailored automated quoting workflows.
          </p>
          
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a href="#quote-form" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-8 py-3.5 rounded-xl transition shadow-lg text-xs uppercase tracking-wider">Book Our Services</a>
            <a href="#catering-menu" className="border border-slate-400 bg-slate-950/40 hover:bg-white hover:text-slate-950 font-bold px-8 py-3.5 rounded-xl transition text-xs text-slate-100 uppercase tracking-wider backdrop-blur-sm">Explore / Order our Services</a>
            <a href="#contact-coordinates" className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-8 py-3.5 rounded-xl transition text-xs uppercase tracking-wider shadow-md">Get our Support</a>
          </div>
        </div>

        {liveHeroSlides.length > 1 && (
          <>
            <button onClick={handlePrevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-900/60 hover:bg-amber-50 text-white transition"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={handleNextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-900/60 hover:bg-amber-50 text-white transition"><ChevronRight className="w-5 h-5" /></button>
          </>
        )}
      </section>

      {/* 3. Event Types Matrix Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10 max-w-xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Events We Service Flawlessly</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {eventTypes.map((type, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl border border-slate-200/60 text-center shadow-sm hover:border-emerald-900 transition">
              <UtensilsCrossed className="w-4 h-4 text-emerald-900 mx-auto mb-2" />
              <h4 className="font-black text-slate-800 text-xs sm:text-sm tracking-tight">{type}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Strategic Corporate Capabilities */}
      <section className="bg-emerald-950 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-emerald-900/30 border border-emerald-800 rounded-2xl">
            <ChefHat className="w-5 h-5 text-amber-500 mb-2" />
            <h3 className="text-base font-bold">Gourmet Catering Pots</h3>
            <p className="text-xs text-slate-300">Order large party dishes and traditional local swallows safely packed under strict monitoring.</p>
          </div>
          <div className="p-6 bg-emerald-900/30 border border-emerald-800 rounded-2xl">
            <Truck className="w-5 h-5 text-amber-500 mb-2" />
            <h3 className="text-base font-bold">Premium Home Chef Service</h3>
            <p className="text-xs text-slate-300">Our culinary specialists come straight into your residential workspace to manage meal prep arrays.</p>
          </div>
          <div className="p-6 bg-emerald-900/30 border border-emerald-800 rounded-2xl">
            <Layers className="w-5 h-5 text-amber-500 mb-2" />
            <h3 className="text-base font-bold">Free Bundled Logistics</h3>
            <p className="text-xs text-slate-300">All rental supplies include absolute zero surcharge when combined with high-tier packages.</p>
          </div>
        </div>
      </section>

      {/* 5. Pricing Estimator Matrix */}
      <section id="budget-calculator" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12"><h2 className="text-3xl font-black text-slate-900">Interactive Price Matrix</h2></div>
        <div className="grid md:grid-cols-5 gap-8">
          <form onSubmit={runCalculatorFormula} className="md:col-span-3 bg-white border border-slate-200 p-6 rounded-2xl space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <label>Expected Target Guests</label>
                <span>{calcGuests} Attendees</span>
              </div>
              <input type="range" min="20" max="1000" step="10" value={calcGuests} onChange={(e) => setCalcGuests(Number(e.target.value))} className="w-full accent-emerald-900" />
            </div>
            <div>
              <select value={calcMenuTier} onChange={(e) => setCalcMenuTier(e.target.value)} className="w-full bg-slate-50 border p-3 rounded-xl text-xs font-bold">
                <option value="standard">Standard Native Tier (₦{Number(liveRates.standard_rate).toLocaleString()} / head)</option>
                <option value="premium">Premium Continental Buffet (₦{Number(liveRates.premium_rate).toLocaleString()} / head)</option>
                <option value="executive">Executive Imperial Banquet (₦{Number(liveRates.executive_rate).toLocaleString()} / head)</option>
              </select>
            </div>
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl">
              <label className="text-xs font-bold">Deploy Canopy Tent Infrastructure?</label>
              <input type="checkbox" checked={calcNeedCanopies} onChange={(e) => setCalcNeedCanopies(e.target.checked)} className="w-5 h-5 accent-emerald-900" />
            </div>
            <button type="submit" className="w-full bg-emerald-900 text-white py-4 rounded-xl font-bold text-xs">Calculate Budget Estimate Tally</button>
          </form>
          <div className="md:col-span-2 bg-slate-900 text-white p-6 rounded-2xl">
            <h3 className="text-amber-500 text-xs font-bold uppercase mb-4">Calculation Tally Result</h3>
            {calculatorTally !== null ? (
              <span className="text-4xl font-black">₦{Number(calculatorTally).toLocaleString()}</span>
            ) : (
              <p className="text-xs text-slate-400">Press compute to compile estimations dashboard.</p>
            )}
          </div>
        </div>
      </section>

      {/* 6. Marketplace: Gourmet Catering Pots Catalog */}
      <section id="catering-menu" className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12 text-center"><h2 className="text-3xl font-black text-slate-900">Catering Catalog</h2></div>
        {catalogLoading ? (
          <div className="text-center py-12 text-xs font-bold animate-pulse">Syncing live inventory...</div>
        ) : liveFoodMenu.length === 0 ? (
          <div className="text-center py-12 text-xs text-slate-500 bg-slate-50 rounded-2xl border border-dashed">No culinary dishes configured inside admin yet.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveFoodMenu.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border overflow-hidden flex flex-col justify-between shadow-sm">
                <img src={item.img} alt={item.name} className="w-full h-52 object-cover" />
                <div className="p-6 flex-grow"><h3 className="font-bold text-slate-900">{item.name}</h3><p className="text-xs text-slate-500">{item.desc}</p></div>
                <div className="p-6 pt-0 border-t flex items-center justify-between">
                  <div><span className="text-xl font-black">₦{Number(item.price).toLocaleString()}</span></div>
                  <button type="button" onClick={() => addToCart({ id: Number(item.id) + 1000, name: item.name, price: Number(item.price), quantity: 1, image: item.img, isRental: false, isByDozen: false })} className="bg-emerald-900 text-white px-4 py-2 rounded-xl text-xs font-bold font-black flex items-center gap-1"><Plus className="w-3.5 h-3.5 text-amber-500" /> Add Pot</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 7. Logistics Section: Event Rentals Matrix (Safely Fixed & Closed) */}
      <section id="rental-menu" className="max-w-7xl mx-auto px-4 py-16 bg-slate-900 text-white rounded-3xl my-10">
        <div className="mb-12 text-center"><h2 className="text-3xl font-black">Event Supplies & Rentals</h2></div>
        {catalogLoading ? (
          <div className="text-center py-12 text-xs text-slate-400 animate-pulse">Syncing logistics list...</div>
        ) : liveRentalInventory.length === 0 ? (
          <div className="text-center py-12 text-xs text-slate-400">No logistics inventory items configured inside admin yet.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {liveRentalInventory.map((item) => (
              <div key={item.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 p-4 flex flex-col justify-between">
                <img src={item.img} alt={item.name} className="w-full h-40 object-cover rounded-lg" />
                <div className="my-3"><h4 className="font-bold text-sm">{item.name}</h4><p className="text-[11px] text-slate-400">{item.desc}</p></div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                  <span className="text-sm font-bold">₦{Number(item.price).toLocaleString()}</span>
                  <button type="button" onClick={() => addToCart({ id: Number(item.id) + 2000, name: item.name, price: Number(item.price), quantity: 1, image: item.img, isRental: true, isByDozen: item.isByDozen || false })} className="bg-amber-500 text-slate-950 text-xs px-3 py-1.5 rounded-lg font-bold">Rent Item</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    


    {/* 8. Stateful Unified Shopping Cart & Checkout Interface */}
      <section id="shopping-cart" className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-black text-slate-900">Your Configured Basket</h2>
            {cart.length > 0 && (
              <button type="button" onClick={clearCart} className="text-xs text-red-600 font-bold flex items-center gap-1 hover:underline">
                <Trash2 className="w-3.5 h-3.5" /> Wipe Cart
              </button>
            )}
          </div>
          
          {cart.length === 0 ? (
            <div className="bg-white border rounded-2xl p-12 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto">Your synchronized basket terminal is currently empty. Mix food elements or rental items from the catalogs above to build your order footprint.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((cartItem, index) => (
                <div key={cartItem.id || index} className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cartItem.image} alt={cartItem.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                    <div>
                      <h4 className="font-black text-slate-900 text-xs sm:text-sm">{cartItem.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[9px] uppercase font-bold text-emerald-900 tracking-wider bg-emerald-50 px-2 py-0.5 rounded">{cartItem.isRental ? 'Logistics Unit' : 'Food Stock'}</span>
                      </div>

                      <div className="flex items-center gap-1.5 mt-2">
                        <button 
                          type="button"
                          onClick={(e) => handleDecrementItem(e, cartItem)} 
                          className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-600 transition cursor-pointer"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        
                        <span className="text-[11px] font-bold text-slate-800 min-w-[14px] text-center">
                          {cartItem.quantity}
                        </span>
                        
                        <button 
                          type="button"
                          onClick={(e) => handleIncrementItem(e, cartItem)} 
                          className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 text-slate-600 transition cursor-pointer"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right shrink-0 flex flex-col items-end justify-between self-stretch py-0.5">
                    <div className="font-black text-slate-900 text-xs sm:text-sm">₦{(cartItem.price * cartItem.quantity).toLocaleString()}</div>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromCart(cartItem.id, cartItem.isByDozen || false);
                      }} 
                      className="text-[9px] text-red-600 font-bold tracking-wider uppercase hover:underline mt-1 block"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stateful Form Controller */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xl h-fit space-y-6">
          <div>
            <h3 className="text-lg font-black text-slate-900">Billing Verification Console</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Fill out clear logistical details to route your order payload securely.</p>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <span className="text-xs font-black text-slate-600 uppercase tracking-wider">Gross Total Tally:</span>
            <span className="text-2xl font-black text-emerald-950">₦{getCartTotal().toLocaleString()}</span>
          </div>

          {checkoutComplete ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-5 rounded-xl text-center text-xs space-y-3">
              <CheckCircle className="w-8 h-8 text-emerald-900 mx-auto" />
              <p className="font-bold text-sm">Order Verification Initialized!</p>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                {paymentMethod === 'TRANSFER' 
                  ? 'Your bank transfer allocation is pending administrative review. An invoice detailing the target Access Bank account coordinates has been dispatched directly to your client email.' 
                  : 'Online authorization pipeline successful. Gateway token generated, and preparing menu assemblies immediately.'}
              </p>
              <button type="button" onClick={() => setCheckoutComplete(false)} className="text-[10px] uppercase tracking-wider font-black text-emerald-900 underline block mx-auto pt-1">Log Another Transaction</button>
            </div>
          ) : (
            <form onSubmit={handleCheckoutSubmit} className="space-y-3">
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input type="text" required placeholder="Your Client Full Name" className="w-full border border-slate-200 p-2.5 pl-9 rounded-xl text-xs outline-none bg-slate-50 focus:border-emerald-900 text-slate-800 font-medium" value={shippingForm.name} onChange={e => setShippingForm({...shippingForm, name: e.target.value})} />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input type="email" required placeholder="Email Address for Invoices" className="w-full border border-slate-200 p-2.5 pl-9 rounded-xl text-xs outline-none bg-slate-50 focus:border-emerald-900 text-slate-800 font-medium" value={shippingForm.email} onChange={e => setShippingForm({...shippingForm, email: e.target.value})} />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input type="text" required placeholder="Active Mobile Phone Number" className="w-full border border-slate-200 p-2.5 pl-9 rounded-xl text-xs outline-none bg-slate-50 focus:border-emerald-900 text-slate-800 font-medium" value={shippingForm.phone} onChange={e => setShippingForm({...shippingForm, phone: e.target.value})} />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <textarea required placeholder="Precise Delivery or Event Venue Address Details" rows={2} className="w-full border border-slate-200 p-2.5 pl-9 rounded-xl text-xs outline-none bg-slate-50 focus:border-emerald-900 text-slate-800 font-medium" value={shippingForm.address} onChange={e => setShippingForm({...shippingForm, address: e.target.value})}></textarea>
              </div>
              
              <div className="space-y-1 pt-1">
                <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">Gateway Authorization Node</label>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setPaymentMethod('ONLINE')} className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition text-center ${paymentMethod === 'ONLINE' ? 'border-emerald-900 bg-emerald-50 text-emerald-950 font-bold shadow-sm' : 'border-slate-200 text-slate-400 bg-white'}`}>
                    <CreditCard className="w-4 h-4 text-amber-500" />
                    <span className="text-[10px] tracking-tight">Pay Online Gateway</span>
                  </button>
                  <button type="button" onClick={() => setPaymentMethod('TRANSFER')} className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition text-center ${paymentMethod === 'TRANSFER' ? 'border-emerald-900 bg-emerald-50 text-emerald-950 font-bold shadow-sm' : 'border-slate-200 text-slate-400 bg-white'}`}>
                    <Landmark className="w-4 h-4 text-amber-500" />
                    <span className="text-[10px] tracking-tight">Direct Bank Transfer</span>
                  </button>
                </div>
              </div>

              <button type="submit" disabled={checkoutLoading || cart.length === 0} className="w-full bg-emerald-900 hover:bg-emerald-950 text-white py-3.5 rounded-xl font-black uppercase text-xs tracking-wider transition disabled:opacity-40">Submit Order</button>
            </form>
          )}
        </div>
      </section>

      {/* 9. Administrative Module: Comprehensive Long-Form Quote Portal */}
      <section id="quote-form" className="bg-slate-900 text-white py-20 px-4 relative">
        <div className="max-w-4xl mx-auto bg-slate-950 p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl relative">
          <div className="text-center mb-10 space-y-1">
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">Administrative Booking Request</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">For complex events requiring bespoke menu items, extensive equipment rentals, or professional home-chef teams, submit an administrative booking request below.</p>
          </div>

          {quoteSubmitted ? (
            <div className="bg-emerald-950/80 border border-emerald-800 p-8 rounded-2xl text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-amber-500 mx-auto" />
              <h4 className="text-xl font-black text-white">Your bespoke booking request has been successfully submitted.</h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto">
                Your parameters have been securely logged. An automated tracking notification has been sent to your inbox. Our admin will evaluate the itemized criteria and update your invoice directly through our mail engine shortly.
              </p>
              <button onClick={() => setQuoteSubmitted(false)} className="text-xs text-amber-500 font-bold uppercase underline tracking-wider pt-2 block mx-auto">Submit Another Booking Request</button>
            </div>
          ) : (
            <form onSubmit={handleQuoteSubmit} className="space-y-5">
              
              {/* Row 1: Name and Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                  <input type="text" required placeholder="Client Full Name" className="w-full bg-slate-900 border border-slate-800 p-3.5 pl-10 rounded-xl text-xs outline-none focus:border-amber-500 text-white font-medium" value={quoteForm.name} onChange={e => setQuoteForm({...quoteForm, name: e.target.value})} />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                  <input type="email" required placeholder="Valid Email Address" className="w-full bg-slate-900 border border-slate-800 p-3.5 pl-10 rounded-xl text-xs outline-none focus:border-amber-500 text-white font-medium" value={quoteForm.email} onChange={e => setQuoteForm({...quoteForm, email: e.target.value})} />
                </div>
              </div>

              {/* Row 2: Phone, Attendance, Event Type */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                  <input type="text" required placeholder="Mobile Phone Line" className="w-full bg-slate-900 border border-slate-800 p-3.5 pl-10 rounded-xl text-xs outline-none focus:border-amber-500 text-white font-medium" value={quoteForm.phone} onChange={e => setQuoteForm({...quoteForm, phone: e.target.value})} />
                </div>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                  <input type="number" required placeholder="Estimated Attendance" className="w-full bg-slate-900 border border-slate-800 p-3.5 pl-10 rounded-xl text-xs outline-none focus:border-amber-500 text-white font-medium" value={quoteForm.guestCount} onChange={e => setQuoteForm({...quoteForm, guestCount: parseInt(e.target.value) || 0})} />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                  <select className="w-full bg-slate-900 border border-slate-800 p-3.5 pl-10 rounded-xl text-xs outline-none focus:border-amber-500 text-slate-300 font-bold cursor-pointer appearance-none" value={quoteForm.eventType} onChange={e => setQuoteForm({...quoteForm, eventType: e.target.value})}>
                    <option value="" disabled>Select Event Type</option>
                    {eventTypes.map((typeOption, keyIdx) => <option key={keyIdx} value={typeOption}>{typeOption}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 3: Event Execution Date & Logistics Model Selection */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                  <input type="date" required className="w-full bg-slate-900 border border-slate-800 p-3.5 pl-10 rounded-xl text-xs outline-none focus:border-amber-500 text-slate-300 font-medium" value={quoteForm.eventDate} onChange={e => setQuoteForm({...quoteForm, eventDate: e.target.value})} />
                </div>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                  <select className="w-full bg-slate-900 border border-slate-800 p-3.5 pl-10 rounded-xl text-xs outline-none focus:border-amber-500 text-slate-300 font-bold cursor-pointer appearance-none" value={quoteForm.serviceType} onChange={e => setQuoteForm({...quoteForm, serviceType: e.target.value})}>
                    <option value="DELIVERY">Cook & Deliver</option>
                    <option value="HOME_SERVICE">Cook at Client's House</option>
                    <option value="FULL_EVENT">Full Event Catering & Setup</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Event Location Address Input Box */}
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                <input type="text" required placeholder="Physical Event Delivery Address Location" className="w-full bg-slate-900 border border-slate-800 p-3.5 pl-10 rounded-xl text-xs outline-none focus:border-amber-500 text-white font-medium" value={quoteForm.address} onChange={e => setQuoteForm({...quoteForm, address: e.target.value})} />
              </div>
              
              {/* Row 5: Side-by-Side Specific Catering & Rental Specifications */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <ChefHat className="w-3.5 h-3.5 text-amber-500" /> Requested Menu Items *
                  </label>
                  <textarea 
                    required 
                    placeholder="List your desired dishes, food pots, local swallows, or custom catering requests..." 
                    rows={3} 
                    className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs outline-none focus:border-amber-500 text-white font-medium leading-relaxed" 
                    value={quoteForm.requestedMenuItemsInput || ''} 
                    onChange={e => setQuoteForm(prev => ({...prev, requestedMenuItemsInput: e.target.value}))}
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-amber-500" /> Requested Rental Items *
                  </label>
                  <textarea 
                    required 
                    placeholder="Specify high-peak canopy counts, table structures, chairs, or logistical silverware needs..." 
                    rows={3} 
                    className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs outline-none focus:border-amber-500 text-white font-medium leading-relaxed" 
                    value={quoteForm.requestedRentalItemsInput || ''} 
                    onChange={e => setQuoteForm(prev => ({...prev, requestedRentalItemsInput: e.target.value}))}
                  ></textarea>
                </div>
              </div>

              {/* Row 6: General Setup Notes & Timeline Instructions */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-amber-500" /> Additional Setup Notes & Timeline Instructions
                </label>
                <textarea 
                  placeholder="Detail explicit delivery schedules, layout variations, service styling preferences..." 
                  rows={2} 
                  className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs outline-none focus:border-amber-500 text-white font-medium leading-relaxed" 
                  value={quoteForm.notes || ''} 
                  onChange={e => setQuoteForm(prev => ({...prev, notes: e.target.value}))}
                ></textarea>
              </div>

              <button type="submit" disabled={quoteLoading} className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-4 rounded-xl uppercase text-xs tracking-widest transition disabled:opacity-50 shadow-lg shadow-amber-500/5">
                {quoteLoading ? 'Transmitting Pipeline Data...' : 'Submit Administrative Query Blueprint'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 10. Long-Form Corporate Brand About Manifesto Section */}
      <section id="about-manifesto" className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <div className="inline-block text-[10px] uppercase font-black text-amber-500 tracking-widest bg-amber-50 px-3 py-1 rounded border border-amber-200/40">Our Story & Operations</div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none">Uncompromising Culinary Prowess Based In Abuja</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Dina Catering and Rentals Services is an integrated premium event architecture brand operating natively out of Wuse II, Abuja, Nigeria. We are built on providing structural reliability, premium hygiene protocols, and high-fidelity local and continental flavors.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            We handle everything from bulk single food pot drop-offs to complex event logistics. Our modern web platform calculates costs instantly and simplifies checkout with automated verification tracking models.
          </p>
        </div>
        <div className="bg-gradient-to-br from-emerald-950 to-slate-950 text-white p-8 md:p-10 rounded-3xl border border-emerald-900/60 shadow-xl relative min-h-[320px] flex flex-col justify-end overflow-hidden">
          <div className="absolute top-0 right-0 p-6 text-[9px] uppercase font-black tracking-widest text-emerald-600">Core Guarantee</div>
          <div className="space-y-2">
            <h4 className="text-lg font-black text-amber-500">Flawless Venues. Guaranteed.</h4>
            <p className="text-xs text-slate-300 leading-relaxed">By maintaining complete direct ownership over all our infrastructural chairs, tableware equipment, and tent materials, we pass significant cost exemptions straight to our catering package subscribers, preventing third-party delay issues entirely.</p>
          </div>
        </div>
      </section>

      {/* 11. Infinite Client Testimonial Marquee Row Mount */}
      <TestimonialSlider />

      {/* 12. Complete Support Coordinates Console Component */}
      <section id="contact-coordinates" className="bg-slate-100 py-20 px-4 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-1">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Initiate Event Planning</h2>
            <p className="text-xs text-slate-500">Connect with our support team to verify transfer transactions, inspect materials, or customize menu packages.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Auxiliary Direct Contact Form Box */}
            <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-2 border-b pb-2">Open Direct Message Channel</h3>
              
              {quoteForm.footerMessageSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center space-y-2 py-10 animate-fade-in">
                  <CheckCircle className="w-10 h-10 text-emerald-700 mx-auto" />
                  <h4 className="text-sm font-black text-slate-900">Message Transmitted Successfully</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you. Your inquiry has been successfully routed to our Admin desk. A confirmation tracking notice has been dispatched to your email inbox.
                  </p>
                  <button 
                    type="button"
                    onClick={() => setQuoteForm({ ...quoteForm, footerMessageSubmitted: false })}
                    className="text-xs text-emerald-900 font-bold uppercase underline tracking-wider pt-2"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setQuoteForm({ ...quoteForm, footerMessageLoading: true });
                    
                    try {
                      const response = await fetch('http://localhost:8000/api/contact/', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Accept': 'application/json',
                        },
                        body: JSON.stringify({
                          name: quoteForm.footerName,
                          email: quoteForm.footerEmail,
                          subject: "Contact Inquiry", 
                          message: quoteForm.footerMessage
                        }),
                      });

                      if (response.ok) {
                        setQuoteForm({
                          ...quoteForm,
                          footerName: '',
                          footerEmail: '',
                          footerMessage: '',
                          footerMessageSubmitted: true,
                          footerMessageLoading: false
                        });
                      } else {
                        alert("Could not process your message details. Please check your text parameters.");
                        setQuoteForm({ ...quoteForm, footerMessageLoading: false });
                      }
                    } catch (err) {
                      console.error(err);
                      alert("Network connectivity timeout. Check your Django runtime server.");
                      setQuoteForm({ ...quoteForm, footerMessageLoading: false });
                    }
                  }} 
                  className="space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      required
                      placeholder="Your Full Name" 
                      className="w-full border border-slate-200 p-3 rounded-xl text-xs bg-slate-50 outline-none text-slate-800 font-medium focus:border-emerald-900" 
                      value={quoteForm.footerName || ''}
                      onChange={e => setQuoteForm({ ...quoteForm, footerName: e.target.value })}
                    />
                    <input 
                      type="email" 
                      required
                      placeholder="Email Address" 
                      className="w-full border border-slate-200 p-3 rounded-xl text-xs bg-slate-50 outline-none text-slate-800 font-medium focus:border-emerald-900" 
                      value={quoteForm.footerEmail || ''}
                      onChange={e => setQuoteForm({ ...quoteForm, footerEmail: e.target.value })}
                    />
                  </div>
                  <textarea 
                    required
                    placeholder="Enter custom inquiry specifications below..." 
                    rows={4} 
                    className="w-full border border-slate-200 p-3 rounded-xl text-xs bg-slate-50 outline-none text-slate-800 font-medium focus:border-emerald-900 leading-relaxed resize-none"
                    value={quoteForm.footerMessage || ''}
                    onChange={e => setQuoteForm({ ...quoteForm, footerMessage: e.target.value })}
                  />
                  <button 
                    type="submit" 
                    disabled={quoteForm.footerMessageLoading}
                    className="bg-emerald-900 hover:bg-emerald-950 disabled:bg-slate-300 text-white text-xs font-black uppercase tracking-wider py-3.5 px-8 rounded-xl transition shadow-md shadow-emerald-900/5 cursor-pointer disabled:cursor-not-allowed active:scale-98"
                  >
                    {quoteForm.footerMessageLoading ? "Transmitting Fields..." : "Send Message Summary"}
                  </button>
                </form>
              )}
            </div>

            {/* Coordinates Matrix Box */}
            <div className="space-y-6">
              <div className="bg-slate-950 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4 text-xs">
                <h3 className="text-xs font-black text-amber-500 uppercase tracking-widest border-b border-slate-800 pb-2">Headquarters Coordinates</h3>
                <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-amber-500 shrink-0" /> <span className="font-medium text-slate-200">+234 803 752 3826</span></div>
                <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-amber-500 shrink-0" /> <span className="font-medium text-slate-200">info@dinacatering.com</span></div>
                <div className="flex items-start gap-3"><MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /> <span className="font-medium text-slate-200">Plot 123 Event Avenue, Wuse II, Abuja, Nigeria</span></div>
                <div className="flex items-start gap-3"><Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /> <span className="font-medium text-slate-400 leading-relaxed">Mon - Fri: 8:00 AM - 6:00 PM<br />Sat: 9:00 AM - 5:00 PM<br /><span className="text-amber-500">Sunday: Closed for Major Event Dispatches</span></span></div>
              </div>

              {/* Instant WhatsApp Action Bridge Box */}
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-center space-y-3">
                <h4 className="font-black text-emerald-950 text-sm">Need Urgent Assistance?</h4>
                <p className="text-[11px] text-emerald-800 leading-relaxed max-w-xs mx-auto">Skip forms entirely. Execute a live chat link with our on-duty logistics supervisor directly to verify transfer slips.</p>
                <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider py-3 px-4 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm active:scale-98">
                  <MessageSquare className="w-4 h-4" /> Connect On WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}