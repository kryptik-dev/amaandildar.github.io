/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0a0a0a',
          light: '#111111',
          dark: '#000000',
        },
        accent: {
          green: '#00ff88',
          'green-dark': '#00cc6a',
          blue: '#00d9ff',
          'blue-dark': '#0099cc',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.05)',
          medium: 'rgba(255, 255, 255, 0.08)',
          heavy: 'rgba(255, 255, 255, 0.12)',
        },
        metal: {
          light: '#c0c0c0',
          medium: '#808080',
          dark: '#404040',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-1': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '0.9' }],
        'display-2': ['clamp(2.5rem, 6vw, 6rem)', { lineHeight: '0.95' }],
        'display-3': ['clamp(2rem, 4vw, 4rem)', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      backdropBlur: {
        'xs': '2px',
        '4xl': '72px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-in-left': 'slide-in-left 0.8s ease-out',
        'slide-in-right': 'slide-in-right 0.8s ease-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'bg-shift': 'bg-shift 8s ease-in-out infinite',
      },
      backgroundImage: {
        'metal-gradient': 'linear-gradient(135deg, #c0c0c0 0%, #808080 50%, #404040 100%)',
        'green-gradient': 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
        'blue-gradient': 'linear-gradient(135deg, #00d9ff 0%, #0099cc 100%)',
        'grid-pattern': 'linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)',
        'dots-pattern': 'radial-gradient(circle, rgba(0, 255, 136, 0.15) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '50px 50px',
        'dots': '30px 30px',
      },
    },
  },
  plugins: [],
}