import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          950: '#070913',
          900: '#0C0F22',
          850: '#111530',
          800: '#171D42',
          700: '#222B5E',
        },
        gold: {
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
          brass: '#F5C518',
          luminous: '#FFD700',
        },
        mystic: {
          white: '#FFFFFF',
          cream: '#FAF9F6',
          light: '#F1F5F9',
          muted: '#94A3B8',
        }
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-bright-gradient': 'linear-gradient(135deg, #FFF08A 0%, #FFD700 45%, #EAB308 100%)',
        'gold-subtle-glow': 'radial-gradient(circle, rgba(255, 215, 0, 0.18) 0%, rgba(7, 9, 19, 0) 70%)',
        'card-glass': 'linear-gradient(180deg, rgba(18, 23, 52, 0.75) 0%, rgba(10, 13, 30, 0.9) 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px -4px rgba(255, 215, 0, 0.35)',
        'gold-bright': '0 0 40px 2px rgba(255, 215, 0, 0.5)',
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'spin-reverse-slow': 'spinReverse 75s linear infinite',
      },
      keyframes: {
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
