"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { CreditCard, Landmark, ShieldCheck, Plus, Minus, Trash2 } from 'lucide-react';

export default function CartAndCheckoutPage() {
  const { cart, getCartTotal, clearCart, removeFromCart, updateQuantity } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'ONLINE' | 'TRANSFER'>('ONLINE');
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [shipping, setShipping] = useState({ name: '', email: '', phone: '', address: '' });

  // Dynamically load the Paystack Inline JavaScript SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Intercept the submission event to choose the right pipeline
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'ONLINE') {
      executePaystackGateway();
    } else {
      executeBackendOrderSubmission({ reference: "BANK_TRANSFER_PENDING", status: false });
    }
  };

  // Launch Paystack Core Portal Popups
  const executePaystackGateway = () => {
    // @ts-ignore
    if (typeof window !== "undefined" && window.PaystackPop) {
      // @ts-ignore
      const handler = window.PaystackPop.setup({
        key: 'pk_test_07ca2f38b19da687aae108a0148f5652e7c24be6',
        email: shipping.email,
        amount: getCartTotal() * 100, // Amount converted to Kobo
        currency: 'NGN',
        callback: function (response: any) {
          executeBackendOrderSubmission({ reference: response.reference, status: true });
        },
        onClose: function () {
          alert('Transaction closed. Order booking remains unverified.');
        }
      });
      handler.openIframe();
    } else {
      alert("Paystack secure terminal failed to load. Check internet access.");
    }
  };

  // Dispatch fully validated data payload arrays to Django
  const executeBackendOrderSubmission = async (paymentDetails: { reference: string, status: boolean }) => {
    setProcessing(true);
    
    // Safety Log: Inspect your actual browser state object structure
    console.log("👉 CURRENT CART STATE METADATA:", cart);

    const payload = {
      client_name: shipping.name,
      client_email: shipping.email,
      client_phone: shipping.phone,
      delivery_address: shipping.address,
      delivery_date: new Date().toISOString(), 
      payment_method: paymentMethod,
      payment_status: paymentDetails.status,
      total_amount: getCartTotal(),
      paystack_reference: paymentDetails.reference,
      
          // 🛠️ CLEAN & TYPE-SAFE RE-MAPPER PIPELINE:
      items: cart.map(item => {
        // Force the ID to a number safely
        let cleanNumericId = Number(item.id);

        // If your frontend code adds a 500 offset value for rentals (e.g., 503 becomes 3)
        if (cleanNumericId > 500) {
          cleanNumericId = cleanNumericId - 500;
        }

        return {
          item: cleanNumericId,
          quantity: item.quantity,
          price: item.price, 
          is_by_dozen: item.isByDozen || false
        };
      })
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/orders/create/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        clearCart();
        setOrderComplete(true);
      } else {
        const errorData = await res.json();
        console.error("Django Validation Exceptions:", errorData);
      }
    } catch (err) {
      console.error("Connection failed:", err);
    } finally {
      setProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="max-w-xl mx-auto my-24 p-10 bg-white rounded-3xl text-center shadow-xl border border-slate-200/60 space-y-4">
        <h2 className="text-3xl font-black text-emerald-950 tracking-tight">Order Initiated Successfully!</h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          {paymentMethod === 'TRANSFER' 
            ? "Your request is pending administrative verification. Please verify the bank transaction details sent via email."
            : "Payment processed successfully online. An official receipt acknowledgment has been sent to your email inbox."}
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto my-24 text-center p-8 bg-white border border-slate-200/60 rounded-3xl shadow-sm space-y-2">
        <p className="text-lg font-black text-slate-900">Your shopping cart is currently empty.</p>
        <p className="text-xs font-medium text-slate-500">Add catering options or event rental assets to proceed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-3 gap-10 items-start">
      {/* Items List */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Review Selected Items</h2>
        
        {cart.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl shadow-xs flex items-center justify-between border border-slate-200/60 hover:border-slate-300 transition duration-200 group">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-slate-100 shrink-0" />
            <div className="flex-1 ml-4 min-w-0">
              <h4 className="font-bold text-slate-900 text-sm truncate group-hover:text-emerald-900 transition">{item.name}</h4>
              <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-slate-50 border border-slate-100 mt-1 inline-block text-slate-500">
                {item.isRental ? "Rental Asset" : "Culinary Pot"}
              </span>

              {/* Inline Quantity Controls Component */}
              <div className="flex items-center gap-2 mt-2">
                <button 
                  type="button"
                  onClick={() => {
                    if (item.quantity <= 1) {
                      removeFromCart(item.id, item.isByDozen || false);
                    } else {
                      updateQuantity(item.id, item.isByDozen || false, item.quantity - 1);
                    }
                  }}
                  className="p-1 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-bold text-slate-800 w-6 text-center">{item.quantity}</span>
  
                <button 
                  type="button"
                  onClick={() => updateQuantity(item.id, item.isByDozen || false, item.quantity + 1)}
                  className="p-1 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="text-right ml-4 shrink-0 flex flex-col items-end gap-2">
              <div className="font-black text-slate-900 text-sm">₦{(item.price * item.quantity).toLocaleString()}</div>
              <button 
                type="button"
                onClick={() => removeFromCart(item.id, item.isByDozen || false)} 
                className="text-[11px] text-red-600 font-bold hover:bg-red-50 px-2.5 py-1 rounded-lg border border-transparent hover:border-red-100 transition flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <Trash2 className="w-3 h-3" /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Sidebar Panel */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-200/60 sticky top-24">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">Order Summary</h3>
        <div className="flex justify-between items-baseline pb-5 mb-6 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-600">Total Invoice Pricing:</span>
          <span className="text-3xl font-black text-emerald-900 tracking-tight">₦{getCartTotal().toLocaleString()}</span>
        </div>

        {/* Form fields rewritten to explicitly assign valid accessible attributes */}
        <form onSubmit={handleCheckoutSubmit} className="space-y-4">
          <div>
            <label htmlFor="client_name" className="sr-only">Full Name</label>
            <input 
              id="client_name"
              name="client_name"
              type="text" 
              placeholder="Full Name" 
              required 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-900 focus:bg-white transition" 
              value={shipping.name} 
              onChange={e => setShipping({...shipping, name: e.target.value})} 
            />
          </div>

          <div>
            <label htmlFor="client_email" className="sr-only">Email Address</label>
            <input 
              id="client_email"
              name="client_email"
              type="email" 
              placeholder="Email Address" 
              required 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-900 focus:bg-white transition" 
              value={shipping.email} 
              onChange={e => setShipping({...shipping, email: e.target.value})} 
            />
          </div>

          <div>
            <label htmlFor="client_phone" className="sr-only">Phone Number</label>
            <input 
              id="client_phone"
              name="client_phone"
              type="text" 
              placeholder="Phone Number" 
              required 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-900 focus:bg-white transition" 
              value={shipping.phone} 
              onChange={e => setShipping({...shipping, phone: e.target.value})} 
            />
          </div>

          <div>
            <label htmlFor="delivery_address" className="sr-only">Delivery Destination Address</label>
            <textarea 
              id="delivery_address"
              name="delivery_address"
              placeholder="Delivery Destination Address in Full" 
              required 
              rows={2} 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-900 focus:bg-white transition resize-none" 
              value={shipping.address} 
              onChange={e => setShipping({...shipping, address: e.target.value})}
            />
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
              Payment Processing Channel
            </span>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("ONLINE")}
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                  paymentMethod === "ONLINE"
                    ? "border-emerald-900 bg-emerald-50 text-emerald-950"
                    : "border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-xs font-bold">Pay Online</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("TRANSFER")}
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                  paymentMethod === "TRANSFER"
                    ? "border-emerald-900 bg-emerald-50 text-emerald-950"
                    : "border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Landmark className="w-4 h-4" />
                <span className="text-xs font-bold">Bank Transfer</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs text-slate-600">
              Secure checkout protected by SSL encryption.
            </span>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-emerald-900 text-white py-3 rounded-xl font-bold hover:bg-emerald-800 transition disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99]"
          >
            {processing
              ? "Processing Order..."
              : paymentMethod === "ONLINE"
              ? "Launch Secure Paystack Payment"
              : "Confirm Order"}
          </button>
        </form>
      </div>
    </div>
  );
}