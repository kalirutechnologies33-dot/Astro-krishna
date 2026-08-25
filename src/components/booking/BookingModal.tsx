'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PhoneCall, FileText, Calendar, Clock, Sparkles, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

interface Service {
  id: string;
  slug: string;
  title: string;
  price_inr: number;
  duration_minutes: number;
  report_turnaround_hours: number;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

const TIME_SLOTS = [
  '10:00 AM - 10:40 AM',
  '11:30 AM - 12:10 PM',
  '02:00 PM - 02:40 PM',
  '04:30 PM - 05:10 PM',
  '06:00 PM - 06:40 PM',
  '07:30 PM - 08:10 PM',
];

export default function BookingModal({ isOpen, onClose, service }: BookingModalProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<'AUDIO_CALL' | 'PDF_REPORT'>('AUDIO_CALL');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: 'Female',
    dob: '',
    tob: '',
    pob: '',
    specificConcerns: '',
    selectedDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    selectedSlot: TIME_SLOTS[1],
  });

  if (!isOpen || !service) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // 1. Create Razorpay Order on Server
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          deliveryMethod,
          clientName: formData.fullName,
          clientEmail: formData.email,
          clientPhone: formData.phone,
          gender: formData.gender,
          dob: formData.dob,
          tob: formData.tob,
          pob: formData.pob,
          specificConcerns: formData.specificConcerns,
          scheduledCallTime: deliveryMethod === 'AUDIO_CALL' ? `${formData.selectedDate} ${formData.selectedSlot}` : null,
          amount: service.price_inr,
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.orderId) {
        throw new Error(orderData.error || 'Failed to initialize booking');
      }

      // 2. Load Razorpay Checkout Script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || !(window as any).Razorpay) {
        throw new Error('Could not load Razorpay payment gateway. Please check your internet connection.');
      }

      const activeKey = orderData.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';

      const options = {
        key: activeKey,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Astro Krishna',
        description: `${service.title} (${deliveryMethod === 'AUDIO_CALL' ? '1-on-1 Call' : 'PDF Report'})`,
        order_id: orderData.orderId,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone.replace(/\D/g, '').slice(-10),
        },
        theme: {
          color: '#070913',
        },
        handler: async function (response: any) {
          try {
            await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                booking_id: orderData.bookingId,
              }),
            });
            window.location.href = `/booking/success?bookingId=${orderData.bookingId}`;
          } catch (verifyErr) {
            console.error('Verification error:', verifyErr);
            window.location.href = `/booking/success?bookingId=${orderData.bookingId}`;
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      
      razorpayInstance.on('payment.failed', function (response: any) {
        console.error('Payment failure event:', response.error);
        setErrorMessage(
          response.error?.description || 
          response.error?.reason || 
          'Payment was not completed. Please try again with UPI or another method.'
        );
        setLoading(false);
      });

      razorpayInstance.open();
    } catch (err: any) {
      console.error('Payment initialization error:', err);
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-cosmic-900 border border-yellow-400/40 rounded-2xl shadow-gold-glow p-6 sm:p-8 text-white my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-mystic-muted hover:text-yellow-300 transition-colors rounded-full hover:bg-cosmic-800"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="mb-6 border-b border-yellow-400/20 pb-4">
            <div className="flex items-center space-x-2 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Astro Krishna • Consultation Booking</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">{service.title}</h2>
            <div className="flex items-center justify-between mt-2">
              <p className="text-yellow-300 font-bold text-xl">₹{service.price_inr.toLocaleString('en-IN')}</p>
              <span className="text-xs text-yellow-200 bg-cosmic-800 px-3 py-1 rounded-full border border-yellow-400/20">
                100% Confidential & Vedic Verified
              </span>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handlePayment} className="space-y-6">
            {/* 1. DELIVERY PREFERENCE TOGGLE */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-yellow-400 mb-2">
                1. Select Consultation Delivery Format
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('AUDIO_CALL')}
                  className={`p-4 rounded-xl border text-left transition-all flex items-start space-x-3 ${
                    deliveryMethod === 'AUDIO_CALL'
                      ? 'bg-cosmic-800 border-yellow-400 shadow-gold-glow ring-1 ring-yellow-400'
                      : 'bg-cosmic-950/60 border-cosmic-700 hover:border-yellow-400/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <PhoneCall className={`w-5 h-5 mt-0.5 ${deliveryMethod === 'AUDIO_CALL' ? 'text-yellow-400' : 'text-mystic-muted'}`} />
                  <div>
                    <div className="font-semibold text-sm text-white">Scheduled Audio Call</div>
                    <div className="text-xs text-mystic-muted mt-0.5">1-on-1 private discussion ({service.duration_minutes} mins)</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('PDF_REPORT')}
                  className={`p-4 rounded-xl border text-left transition-all flex items-start space-x-3 ${
                    deliveryMethod === 'PDF_REPORT'
                      ? 'bg-cosmic-800 border-yellow-400 shadow-gold-glow ring-1 ring-yellow-400'
                      : 'bg-cosmic-950/60 border-cosmic-700 hover:border-yellow-400/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <FileText className={`w-5 h-5 mt-0.5 ${deliveryMethod === 'PDF_REPORT' ? 'text-yellow-400' : 'text-mystic-muted'}`} />
                  <div>
                    <div className="font-semibold text-sm text-white">Written PDF Report</div>
                    <div className="text-xs text-mystic-muted mt-0.5">Delivered within {service.report_turnaround_hours} hours to WhatsApp/Email</div>
                  </div>
                </button>
              </div>
            </div>

            {/* CONDITIONAL TIME PICKER */}
            {deliveryMethod === 'AUDIO_CALL' ? (
              <div className="p-4 rounded-xl bg-cosmic-950/90 border border-yellow-400/25 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-yellow-300">
                  <Calendar className="w-4 h-4 text-yellow-400" />
                  <span>Choose Date & Time Slot (IST)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-mystic-muted mb-1 block">Preferred Date</label>
                    <input
                      type="date"
                      name="selectedDate"
                      required
                      value={formData.selectedDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={handleInputChange}
                      className="w-full bg-cosmic-900 border border-cosmic-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-mystic-muted mb-1 block">Available Slot</label>
                    <select
                      name="selectedSlot"
                      value={formData.selectedSlot}
                      onChange={handleInputChange}
                      className="w-full bg-cosmic-900 border border-cosmic-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-400"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-cosmic-950/90 border border-yellow-400/25 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <p className="text-xs text-mystic-light/80">
                  No scheduling needed. Acharya Krishna will analyze your planetary charts and deliver your comprehensive handwritten PDF report within{' '}
                  <strong className="text-white">48 hours</strong> via WhatsApp and Email.
                </p>
              </div>
            )}

            {/* 2. BIRTH DETAILS */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-yellow-400">
                2. Enter Birth & Contact Details (Accurate to the minute)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name *"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-cosmic-950/70 border border-cosmic-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-mystic-muted/70 focus:outline-none focus:border-yellow-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-cosmic-950/70 border border-cosmic-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-mystic-muted/70 focus:outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="WhatsApp Phone Number (10 digits) *"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-cosmic-950/70 border border-cosmic-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-mystic-muted/70 focus:outline-none focus:border-yellow-400"
                  />
                </div>
                <div>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full bg-cosmic-950/70 border border-cosmic-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-mystic-muted block mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    name="dob"
                    required
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full bg-cosmic-950/70 border border-cosmic-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-mystic-muted block mb-1">Exact Time of Birth *</label>
                  <input
                    type="time"
                    name="tob"
                    required
                    value={formData.tob}
                    onChange={handleInputChange}
                    className="w-full bg-cosmic-950/70 border border-cosmic-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-mystic-muted block mb-1">Place of Birth (City, State) *</label>
                  <input
                    type="text"
                    name="pob"
                    placeholder="e.g. Mumbai, MH"
                    required
                    value={formData.pob}
                    onChange={handleInputChange}
                    className="w-full bg-cosmic-950/70 border border-cosmic-700 rounded-lg px-3 py-2 text-sm text-white placeholder-mystic-muted/70 focus:outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              <div>
                <textarea
                  name="specificConcerns"
                  rows={2}
                  placeholder="Specific questions or primary areas of focus (e.g. Career change, Marriage timeline)..."
                  value={formData.specificConcerns}
                  onChange={handleInputChange}
                  className="w-full bg-cosmic-950/70 border border-cosmic-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-mystic-muted/70 focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            {/* PAYMENT CTA */}
            <div className="pt-3 border-t border-yellow-400/20">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-xl font-bold text-cosmic-950 bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 hover:from-yellow-200 hover:to-yellow-300 border-2 border-yellow-100 shadow-gold-glow hover:shadow-gold-bright transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-base tracking-wide cursor-pointer"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-cosmic-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Pay ₹{service.price_inr.toLocaleString('en-IN')} & Secure Consultation</span>
                    <ShieldCheck className="w-5 h-5 ml-1" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-4 mt-3 text-[11px] text-mystic-muted">
                <span>⚡ UPI / GPay / PhonePe</span>
                <span>•</span>
                <span>💳 All Cards & NetBanking</span>
                <span>•</span>
                <span>🔒 256-Bit Razorpay Secured</span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
