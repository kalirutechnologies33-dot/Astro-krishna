import type { Metadata } from 'next';
import { Inter, Cinzel_Decorative } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cinzel = Cinzel_Decorative({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-cinzel',
});

export const metadata: Metadata = {
  title: 'Astro Krishna | Premium Vedic Astrology & Life Consultations',
  description:
    'Decode your cosmic blueprint, career timing, and marriage compatibility with Acharya Krishna. Authentic Vedic calculations with modern, actionable guidance.',
  keywords: [
    'Vedic Astrology',
    'Kundli Analysis',
    'Kundli Matching',
    'Acharya Krishna',
    'Astro Krishna',
    'Career Horoscope',
    'Solar Return',
  ],
  openGraph: {
    title: 'Astro Krishna | Authentic Vedic Astrology & Life Consultations',
    description: 'Expert Vedic Jyotish guidance for career, wealth, marriage, and life transitions.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable} scroll-smooth dark`}>
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-cosmic-950 text-white min-h-screen antialiased selection:bg-yellow-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
