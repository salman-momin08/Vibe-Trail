import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
        headline: ['Poppins', 'sans-serif'],
        code: ['monospace'],
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
        'secondary-gradient': 'linear-gradient(135deg, #D4145A 0%, #FBB03B 100%)',
        'button-gradient': 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
        'button-gradient-hover': 'linear-gradient(90deg, hsl(var(--primary) / 0.9), hsl(var(--accent) / 0.9))',
        'splash-gradient': 'linear-gradient(135deg, #2D033B, #7209B7)',
        'bubble-gradient-1': 'radial-gradient(circle, #F72585, #7209B7)',
        'bubble-gradient-2': 'radial-gradient(circle, #7209B7, #00F0FF)',
        'aurora-gradient': 'linear-gradient(135deg, #00F0FF, #F72585, #7209B7)',
      },
      colors: {
        'sparkle-cyan': '#00F0FF',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': { 
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to: { opacity: '1', transform: 'translateY(0)' } 
        },
        'shake': {
          '10%, 90%': { transform: 'translate(-1px, 0)' },
          '20%, 80%': { transform: 'translate(2px, 0)' },
          '30%, 50%, 70%': { transform: 'translate(-4px, 0)' },
          '40%, 60%': { transform: 'translate(4px, 0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'letter-reveal': {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.8)', textShadow: '0 0 10px #F72585, 0 0 20px #7209B7' },
          '50%': { opacity: '1', textShadow: '0 0 15px #F72585, 0 0 30px #7209B7, 0 0 5px #00F0FF' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)', textShadow: '0 0 5px #F72585, 0 0 10px #7209B7'  },
        },
        'splash-in': {
          '0%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' },
          '100%': { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' },
        },
        'paper-crumple': {
          '0%': { transform: 'scale(1) rotate(0deg)', filter: 'blur(0)' },
          '50%': { transform: 'scale(1.2, 0.8) rotate(5deg)', filter: 'blur(4px)' },
          '100%': { transform: 'scale(0) rotate(15deg)', filter: 'blur(16px)', opacity: '0' },
        },
        'bubble': {
            '0%': { transform: 'translateY(100vh) scale(0)', opacity: '0.7' },
            '100%': { transform: 'translateY(-10vh) scale(1)', opacity: '0' },
        },
        'aurora': {
          '0%': {
              backgroundPosition: '0% 50%',
          },
          '50%': {
              backgroundPosition: '100% 50%',
          },
          '100%': {
              backgroundPosition: '0% 50%',
          },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'shake': 'shake 0.6s cubic-bezier(.36,.07,.19,.97) both',
        'float': 'float 6s ease-in-out infinite',
        'letter-reveal': 'letter-reveal 1.2s ease-in-out forwards',
        'splash-in': 'splash-in 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'paper-crumple': 'paper-crumple 0.8s ease-in-out forwards',
        'bubble': 'bubble 10s linear infinite',
        'aurora': 'aurora 15s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
