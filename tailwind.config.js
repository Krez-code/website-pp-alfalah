export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F6B4B',
        secondary: '#1B8A5A',
        surface: '#F8FAFC',
        'surface-dark': '#1F2937',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(15, 107, 75, 0.08)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
