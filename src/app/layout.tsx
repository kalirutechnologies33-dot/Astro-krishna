import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Astro Krishna | Premium Vedic Astrology & Cosmic Blueprints',
  description:
    'Consult Acharya Krishna for authentic Vedic Kundli readings, career roadmaps, marriage matchmaking, and practical planetary remedies. Available via Live Audio Calls & Written PDF Reports.',
  keywords: [
    'Astro Krishna',
    'Astrologer Krishna',
    'Acharya Krishna',
    'Vedic Astrology India',
    'Kundli Analysis',
    'Career Horoscope 2026',
    'Marriage Matchmaking',
  ],
  openGraph: {
    title: 'Astro Krishna | Premium Vedic Astrology Consultations',
    description: 'Ancient Vedic Mathematics meets modern actionable guidance. Book your 1-on-1 consultation with Acharya Krishna.',
    url: 'https://astrokrishna.com',
    siteName: 'Astro Krishna',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-cosmic-950 text-white font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
