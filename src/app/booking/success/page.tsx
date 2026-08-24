'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Sparkles, MessageCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  return (
    <div className="min-h-screen bg-cosmic-950 text-mystic-light flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-cosmic-900 border border-gold-brass/30 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">Booking Confirmed!</h1>
        <p className="text-sm text-gold-300 font-medium mb-6">May planetary blessings illuminate your path.</p>

        <div className="p-4 rounded-xl bg-cosmic-950 border border-cosmic-800 text-left text-xs space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-mystic-muted">Booking Reference:</span>
            <span className="text-white font-mono">{bookingId?.slice(0, 12) || 'AK-2026-CONF'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-mystic-muted">Confirmation Sent:</span>
            <span className="text-emerald-400">WhatsApp & Email</span>
          </div>
          <div className="flex justify-between">
            <span className="text-mystic-muted">Next Step:</span>
            <span className="text-gold-300">Acharya Krishna is calculating your chart</span>
          </div>
        </div>

        <div className="space-y-3">
          <a
            href="https://wa.me/919999999999?text=Namaste%20Acharya%20Krishna,%20I%20have%20completed%20my%20booking."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect on WhatsApp Concierge</span>
          </a>

          <Link
            href="/"
            className="w-full py-3.5 px-4 rounded-xl bg-cosmic-800 hover:bg-cosmic-700 text-mystic-light font-medium text-xs flex items-center justify-center gap-2 transition-colors border border-cosmic-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cosmic-950" />}>
      <BookingSuccessContent />
    </Suspense>
  );
}
