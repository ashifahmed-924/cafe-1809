/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
    './data/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#151827',
        rice: '#F4F0E8',
        porcelain: '#C9DBE6',
        ultramarine: '#3554A5',
        persimmon: '#EF6045',
        brass: '#B7A06A',
        graphite: '#272B35',
        mist: '#E3E6E5',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        jp: ['var(--font-jp)', 'serif'],
      },
      maxWidth: {
        shell: '1440px',
      },
    },
  },
  plugins: [],
};
