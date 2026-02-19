import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        netflix: {
          red: '#e50914',
          black: '#141414',
          dark: '#181818',
          gray: '#2f2f2f',
          'gray-light': '#808080',
        },
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
      },
      boxShadow: {
        "soft": "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "soft-lg": "0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 10px -2px rgba(0, 0, 0, 0.04)",
        "card": "0 1px 3px 0 rgba(0, 0, 0, 0.03), 0 1px 2px -1px rgba(0, 0, 0, 0.02)",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        shimmer: 'shimmer 1.5s ease-in-out infinite',
        "form-in": "form-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "form-in-delay-1": "form-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.06s both",
        "form-in-delay-2": "form-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both",
        "form-in-delay-3": "form-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both",
        "form-in-delay-4": "form-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.24s both",
        "form-in-delay-5": "form-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both",
        "form-in-delay-6": "form-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.36s both",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        "form-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
