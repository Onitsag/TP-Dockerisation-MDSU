/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'game-primary': '#6D28D9',
        'game-secondary': '#4C1D95',
        'game-accent': '#F472B6',
        'game-background': '#0F172A',
        'game-foreground': '#1E293B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        gaming: ['Orbitron', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/src/assets/hero-bg.jpg')",
      },
    },
  },
  plugins: [],
};