/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    width: {
      screen: '100dvw',
      full: '100%',
    },
    height: {
      screen: '100dvh',
      full: '100%',
    },
    extend: {
      fontSize: {
        sm: 'clamp(0.83rem, 0.44vw + 0.72rem, 1rem)',
        base: 'clamp(1rem, 0.53vw + 0.87rem, 1.2rem)',
        md: 'clamp(1.2rem, 0.64vw + 1.04rem, 1.44rem)',
        lg: 'clamp(1.44rem, 0.77vw + 1.25rem, 1.73rem)',
        xl: 'clamp(1.73rem, 0.92vw + 1.5rem, 2.07rem)',
        xxl: 'clamp(2.07rem, 1.11vw + 1.8rem, 2.49rem)',
        xxxl: 'clamp(2.49rem, 1.33vw + 2.16rem, 2.99rem)',
      },
    },
  },
  plugins: [],
};
