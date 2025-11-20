/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Merriweather', 'ui-serif', 'Georgia'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      boxShadow: {
        gold: '0 4px 15px rgba(212, 175, 55, 0.4)',
      },
      backgroundImage: {
        'gold-shiny': 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(212, 175, 55, 0.3) 50%, rgba(255, 215, 0, 0.2) 100%)',
        'gold-gradient': 'linear-gradient(to bottom, #000000 0%, #4B4B4B 50%, #D4AF37 100%)',
      },
    },
  },
  plugins: [],
};