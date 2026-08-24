'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Compass,
  Heart,
  Briefcase,
  Sun,
  ShieldCheck,
  Star,
  MessageCircle,
  Clock,
  Award,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
} from 'lucide-react';
import BookingModal from '@/components/booking/BookingModal';

const SERVICES = [
  {
    id: 's1',
    slug: 'kundli-blueprint',
    title: 'Detailed Kundli & Cosmic Blueprint',
    short_description: 'In-depth planetary chart reading deciphering your Mahadashas, planetary strengths, and destiny timeline.',
    price_inr: 600,
    duration_minutes: 40,
    report_turnaround_hours: 48,
    icon: Compass,
    tag: 'Entry Offer',
  },
  {
    id: 's2',
    slug: 'career-wealth-finance',
    title: 'Career, Wealth & Business Destiny',
    short_description: 'Strategic analysis of 10th & 2nd house planetary configurations for high-stakes job changes, business moves, and investments.',
    price_inr: 3499,
    duration_minutes: 45,
    report_turnaround_hours: 48,
    icon: Briefcase,
    tag: 'Executive Guidance',
  },
  {
    id: 's3',
    slug: 'marriage-matchmaking',
    title: 'Marriage & Kundli Matchmaking',
    short_description: 'Comprehensive Ashtakoot Guna Milan, 7th house synastry, Navamsha chart review, and Vedic marital remedies.',
    price_inr: 4999,
    duration_minutes: 50,
    report_turnaround_hours: 36,
    icon: Heart,
    tag: 'High Impact',
  },
  {
    id: 's4',
    slug: 'yearly-solar-forecast',
    title: 'Yearly Solar Return & Planetary Transit Roadmap',
    short_description: 'Month-by-month predictive forecast of major transits including Saturn Sade Sati, Jupiter blessings, and Rahu-Ketu axis.',
    price_inr: 1000,
    duration_minutes: 50,
    report_turnaround_hours: 48,
    icon: Sun,
    tag: 'Complete Roadmap',
  },
];

const TESTIMONIALS = [
  {
    name: 'Ananya Deshmukh',
    role: 'Product Lead, Bengaluru',
    rating: 5,
    text: 'Acharya Krishna’s reading of my Mahadasha was spot on. His guidance on timing my career transition saved me months of stress.',
  },
  {
    name: 'Siddharth & Pooja Verma',
    role: 'New Delhi',
    rating: 5,
    text: 'We consulted Acharya Krishna for our Kundli matching. The written analysis was thorough, practical, and gave us immense peace of mind.',
  },
  {
    name: 'Vikramaditya Iyer',
    role: 'Financial Analyst, Chennai',
    rating: 5,
    text: 'The 1-on-1 audio call gave me absolute clarity. He combines authentic Vedic calculations with rational, modern advice.',
  },
];

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenBooking = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-cosmic-950 text-white font-sans relative selection:bg-gold-400/30 selection:text-gold-200">
      {/* GLOWING AMBIENT AURORA */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-15%] left-[25%] w-[650px] h-[650px] bg-gold-500/15 rounded-full blur-[150px]" />
        <div className="absolute top-[45%] right-[-10%] w-[550px] h-[550px] bg-amber-400/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-900/15 rounded-full blur-[150px]" />
      </div>

      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-40 w-full border-b border-gold-400/20 bg-cosmic-950/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-yellow-500 p-[1.5px] flex items-center justify-center shadow-gold-glow">
              <div className="w-full h-full bg-cosmic-950 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white">ASTRO</span>
              <span className="text-xs font-sans tracking-[0.28em] text-yellow-400 block -mt-1 font-bold">KRISHNA</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-mystic-light/80">
            <a href="#services" className="hover:text-yellow-300 transition-colors">Consultations</a>
            <a href="#about" className="hover:text-yellow-300 transition-colors">About Acharya Krishna</a>
            <a href="#how-it-works" className="hover:text-yellow-300 transition-colors">How It Works</a>
            <a href="#testimonials" className="hover:text-yellow-300 transition-colors">Reviews</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleOpenBooking(SERVICES[0])}
              className="px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider text-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 hover:from-yellow-200 hover:to-yellow-400 border-2 border-yellow-100 shadow-gold-glow hover:shadow-gold-bright transition-all transform hover:scale-105"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* 2. MINIMALIST CENTER-ALIGNED HERO WITH MULTI-LAYER ROTATING VEDIC ZODIAC WHEEL */}
        <section className="relative pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center justify-center overflow-hidden min-h-[88vh]">
          
          {/* DYNAMIC ROTATING CELESTIAL BACKGROUND WHEELS */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
            <div className="relative w-[650px] h-[650px] md:w-[850px] md:h-[850px] flex items-center justify-center">
              
              {/* Layer 1: Outer Zodiac Ring (Rotates Clockwise) */}
              <svg
                viewBox="0 0 800 800"
                className="absolute inset-0 w-full h-full rotate-celestial-cw text-yellow-400/35"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="400" cy="400" r="380" strokeWidth="1.5" strokeDasharray="8 12" />
                <circle cx="400" cy="400" r="350" strokeWidth="2" />
                <circle cx="400" cy="400" r="320" strokeWidth="1" strokeDasharray="4 6" />

                {/* 12 Zodiac House Spoke Rays */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 400 + 240 * Math.cos(angle);
                  const y1 = 400 + 240 * Math.sin(angle);
                  const x2 = 400 + 350 * Math.cos(angle);
                  const y2 = 400 + 350 * Math.sin(angle);
                  return (
                    <g key={i}>
                      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.5" stroke="currentColor" opacity="0.8" />
                      <circle cx={x2} cy={y2} r="4" fill="currentColor" opacity="0.9" />
                    </g>
                  );
                })}

                {/* 27 Nakshatra Micro-ticks */}
                {[...Array(27)].map((_, i) => {
                  const angle = (i * (360 / 27) * Math.PI) / 180;
                  const x1 = 400 + 340 * Math.cos(angle);
                  const y1 = 400 + 340 * Math.sin(angle);
                  const x2 = 400 + 350 * Math.cos(angle);
                  const y2 = 400 + 350 * Math.sin(angle);
                  return <line key={`n-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1" opacity="0.6" />;
                })}
              </svg>

              {/* Layer 2: Inner Sacred Geometry / Kendra Houses (Rotates Counter-Clockwise) */}
              <svg
                viewBox="0 0 800 800"
                className="absolute inset-0 w-full h-full rotate-celestial-ccw text-yellow-300/30"
                fill="none"
                stroke="currentColor"
              >
                <polygon
                  points="400,170 570,330 570,510 400,630 230,510 230,330"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                />
                <polygon
                  points="400,630 570,470 570,290 400,170 230,290 230,470"
                  strokeWidth="1.5"
                />

                <rect x="270" y="270" width="260" height="260" strokeWidth="1" transform="rotate(45 400 400)" />
                <circle cx="400" cy="400" r="140" strokeWidth="1.5" strokeDasharray="3 5" />
                <circle cx="400" cy="400" r="60" strokeWidth="2" stroke="currentColor" />
              </svg>

              {/* Layer 3: Radiant Golden Center Glow */}
              <div className="w-32 h-32 rounded-full bg-yellow-400/20 blur-2xl animate-pulse" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-yellow-400/40 bg-cosmic-900/90 backdrop-blur-md mb-8 shadow-gold-glow"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-yellow-200 font-bold">
              Vedic Astrology • Planetary Calculations • Life Roadmaps
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.15] max-w-4xl drop-shadow-lg"
          >
            Decode Your Destiny with <span className="gold-text-shimmer">Unwavering Vedic Clarity</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 text-lg sm:text-xl text-mystic-light/90 max-w-2xl font-light leading-relaxed drop-shadow"
          >
            Empowering individuals and families with accurate planetary calculations, 
            life-defining transit roadmaps, and actionable astrological guidance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => handleOpenBooking(SERVICES[0])}
              className="w-full sm:w-auto px-9 py-4 rounded-xl text-base font-black text-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 hover:from-yellow-200 hover:to-yellow-300 border-2 border-yellow-100 shadow-gold-bright transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-5 h-5 text-black" />
            </button>

            <a
              href="#services"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white border border-yellow-400/40 hover:border-yellow-300 hover:bg-cosmic-900/80 transition-all backdrop-blur-sm"
            >
              Explore Services & Pricing
            </a>
          </motion.div>

          {/* Minimalist Trust Numbers */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full pt-8 border-t border-yellow-400/20">
            <div className="text-center">
              <div className="text-3xl font-serif font-bold text-yellow-300">12,000+</div>
              <div className="text-xs text-mystic-muted mt-1 uppercase tracking-wider">Charts Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-serif font-bold text-yellow-300">14+ Years</div>
              <div className="text-xs text-mystic-muted mt-1 uppercase tracking-wider">Vedic Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-serif font-bold text-yellow-300">4.9 / 5.0</div>
              <div className="text-xs text-mystic-muted mt-1 uppercase tracking-wider">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-serif font-bold text-yellow-300">100% Private</div>
              <div className="text-xs text-mystic-muted mt-1 uppercase tracking-wider">Confidential Readings</div>
            </div>
          </div>
        </section>

        {/* 3. ABOUT ACHARYA KRISHNA (SACRED EMBLEM LAYOUT) */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-yellow-400/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Sacred Vedic Emblem Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-yellow-400/30 text-center relative overflow-hidden shadow-gold-glow flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-300 via-yellow-400 to-amber-500 p-[2px] flex items-center justify-center mb-6 shadow-gold-bright">
                  <div className="w-full h-full bg-cosmic-950 rounded-full flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-yellow-400" />
                  </div>
                </div>

                <h3 className="text-2xl font-serif font-bold text-white mb-1">Acharya Krishna</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-yellow-400 mb-6">
                  Vedic Jyotish Acharya & Life Timing Specialist
                </p>

                <div className="w-full space-y-3 pt-6 border-t border-yellow-400/20 text-left text-xs">
                  <div className="flex items-center space-x-3 text-mystic-light/90">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span>Traditional Parashara Vedic Certified</span>
                  </div>
                  <div className="flex items-center space-x-3 text-mystic-light/90">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span>Over 12,000+ Individual Chart Consultations</span>
                  </div>
                  <div className="flex items-center space-x-3 text-mystic-light/90">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span>Non-Superstitious, Rational Astrological Remediation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 text-yellow-400 text-xs font-bold uppercase tracking-widest">
                <Award className="w-4 h-4" />
                <span>About The Astrologer</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Astrology is Not Superstition—It is the Sacred Mathematics of Time & Karma.
              </h2>
              <p className="text-mystic-light/80 leading-relaxed font-light">
                With over 14+ years of dedicated practice in traditional Parashara Vedic Jyotish, 
                <strong> Acharya Krishna</strong> has guided thousands of individuals, founders, and families across India and globally.
              </p>
              <p className="text-mystic-light/80 leading-relaxed font-light">
                Every consultation is strictly calculated using exact birth coordinates. You receive practical remedies, gemstone recommendations, 
                and strategic timing for major decisions—free from fear-mongering or superstitious dogmas.
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-cosmic-900/80 border border-yellow-400/20 flex items-start space-x-3">
                  <ShieldCheck className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white">Zero Fear Tactics</div>
                    <div className="text-xs text-mystic-muted mt-0.5">Empowering, clarity-driven guidance.</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-cosmic-900/80 border border-yellow-400/20 flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white">Guaranteed Punctuality</div>
                    <div className="text-xs text-mystic-muted mt-0.5">Scheduled slots & 48h PDF reports.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SERVICES & PRICING GRID */}
        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-yellow-400/20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Consultations & Transparent Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">Select Your Consultation</h2>
            <p className="text-mystic-light/80 mt-4 text-sm sm:text-base">
              Available via <strong>Scheduled 1-on-1 Audio Call</strong> or a <strong>Detailed Written PDF Report</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {SERVICES.map((srv) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="glass-panel glass-panel-hover rounded-2xl p-7 sm:p-9 flex flex-col justify-between relative group border border-yellow-400/25"
                >
                  {srv.tag && (
                    <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-yellow-400/15 border border-yellow-400/40 text-[11px] uppercase font-bold tracking-widest text-yellow-300">
                      {srv.tag}
                    </div>
                  )}

                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-cosmic-900 border border-yellow-400/30 flex items-center justify-center mb-6 text-yellow-400 shadow-gold-glow group-hover:scale-110 transition-transform">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-3">{srv.title}</h3>
                    <p className="text-sm text-mystic-light/80 font-light leading-relaxed mb-6">
                      {srv.short_description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-yellow-400/20">
                    <div className="flex items-baseline justify-between mb-5">
                      <div>
                        <span className="text-3xl font-bold text-white">₹{srv.price_inr.toLocaleString('en-IN')}</span>
                        <span className="text-xs text-mystic-muted ml-2">all-inclusive</span>
                      </div>
                      <div className="text-xs text-yellow-300 font-bold bg-cosmic-900 px-3 py-1 rounded-full border border-yellow-400/30">
                        Audio Call or PDF
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenBooking(srv)}
                      className="w-full py-4 px-6 rounded-xl text-sm font-black uppercase tracking-wider text-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 hover:from-yellow-200 hover:to-yellow-300 border-2 border-yellow-100 shadow-gold-glow hover:shadow-gold-bright transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span className="text-black font-extrabold">Book Consultation</span>
                      <ChevronRight className="w-5 h-5 text-black stroke-[3]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. HOW IT WORKS */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-yellow-400/20 bg-cosmic-900/40 rounded-3xl my-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-yellow-400 font-bold">The Seamless Process</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2">How Astro Krishna Works</h2>
            <p className="text-mystic-light/80 mt-3 text-sm">Four simple steps for convenience, accuracy, and total privacy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-cosmic-950 border border-yellow-400/20 relative">
              <div className="text-3xl font-serif font-bold text-yellow-400/40 mb-3">01</div>
              <h4 className="text-base font-semibold text-white mb-2">Choose Service & Format</h4>
              <p className="text-xs text-mystic-light/70 leading-relaxed">
                Select your focus area and choose between a <strong>Scheduled 1-on-1 Audio Call</strong> or a <strong>Written PDF Report</strong>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cosmic-950 border border-yellow-400/20 relative">
              <div className="text-3xl font-serif font-bold text-yellow-400/40 mb-3">02</div>
              <h4 className="text-base font-semibold text-white mb-2">Enter Birth Details & Pay</h4>
              <p className="text-xs text-mystic-light/70 leading-relaxed">
                Provide accurate date, time, and place of birth. Pay securely using UPI, Cards, or Netbanking via Razorpay.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cosmic-950 border border-yellow-400/20 relative">
              <div className="text-3xl font-serif font-bold text-yellow-400/40 mb-3">03</div>
              <h4 className="text-base font-semibold text-white mb-2">Receive Consultation</h4>
              <p className="text-xs text-mystic-light/70 leading-relaxed">
                Attend your scheduled phone consultation or receive your in-depth handwritten PDF analysis within 48 hours.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cosmic-950 border border-yellow-400/20 relative">
              <div className="text-3xl font-serif font-bold text-yellow-400/40 mb-3">04</div>
              <h4 className="text-base font-semibold text-white mb-2">WhatsApp Follow-Up</h4>
              <p className="text-xs text-mystic-light/70 leading-relaxed">
                Enjoy 7 days of post-consultation query resolution directly via Acharya Krishna's WhatsApp concierge.
              </p>
            </div>
          </div>
        </section>

        {/* 6. TESTIMONIALS */}
        <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-yellow-400/20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-yellow-400 font-bold">Client Reviews</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2">Transformative Experiences</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="glass-panel p-7 rounded-2xl flex flex-col justify-between border border-yellow-400/20">
                <div>
                  <div className="flex space-x-1 mb-4 text-yellow-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-mystic-light/80 leading-relaxed italic">"{t.text}"</p>
                </div>
                <div className="mt-6 pt-4 border-t border-yellow-400/20">
                  <div className="font-semibold text-sm text-white">{t.name}</div>
                  <div className="text-xs text-yellow-300 font-medium">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 7. FOOTER WITH USER WHATSAPP & EMAIL */}
      <footer className="border-t border-yellow-400/25 bg-cosmic-950 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-300 to-amber-500 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-cosmic-950 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </div>
              </div>
              <span className="font-serif text-xl font-bold tracking-wider text-white">ASTRO KRISHNA</span>
            </div>
            <p className="text-xs text-mystic-muted max-w-md leading-relaxed">
              India's premier Vedic astrology sanctuary led by Acharya Krishna, dedicated to mathematical chart precision, life timing, and purposeful clarity.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-yellow-400 mb-3">Quick Links</h5>
            <ul className="space-y-2 text-xs text-mystic-muted">
              <li><a href="#services" className="hover:text-yellow-300">All Consultations</a></li>
              <li><a href="#about" className="hover:text-yellow-300">About Acharya Krishna</a></li>
              <li><a href="#how-it-works" className="hover:text-yellow-300">How Delivery Works</a></li>
              <li><a href="#testimonials" className="hover:text-yellow-300">Client Reviews</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-yellow-400 mb-3">Direct Support</h5>
            
            {/* WhatsApp Link */}
            <a
              href="https://wa.me/919363864607?text=Hello%20Astro%20Krishna,%20I%20would%20like%20to%20inquire%20about%20a%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-600/30 transition-colors w-full"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>WhatsApp: +91 93638 64607</span>
            </a>

            {/* Email Link */}
            <a
              href="mailto:kosmahura@gmail.com"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-cosmic-900 border border-yellow-400/30 text-mystic-light text-xs font-medium hover:border-yellow-300 transition-colors w-full"
            >
              <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              <span>kosmahura@gmail.com</span>
            </a>
          </div>
        </div>

        {/* LEGAL DISCLAIMER */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-yellow-400/20 text-center space-y-3">
          <p className="text-[11px] text-mystic-muted/80 max-w-4xl mx-auto leading-relaxed">
            <strong>Disclaimer:</strong> Astrology is an ancient interpretive science based on astronomical calculations and cosmic energies. 
            All consultations, audio sessions, and written PDF reports provided by Astro Krishna are intended strictly for guidance and self-reflection. 
            They should not be substituted for certified medical, financial, or legal advice.
          </p>
          <div className="text-[11px] text-mystic-muted">
            © {new Date().getFullYear()} Astro Krishna. All Rights Reserved. • Contact: kosmahura@gmail.com | +91 93638 64607
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/919363864607?text=Namaste%20Acharya%20Krishna,%20I%20have%20a%20question%20before%20booking."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-emerald-500 text-white shadow-xl hover:bg-emerald-600 transition-transform transform hover:scale-110 flex items-center justify-center"
        aria-label="WhatsApp Concierge"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </div>
  );
}
