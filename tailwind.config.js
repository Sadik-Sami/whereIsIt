/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(35 95% 45%)',
          light: 'hsl(35 95% 55%)',
          dark: 'hsl(35 95% 35%)',
        },
        secondary: {
          DEFAULT: 'hsl(200 45% 45%)',
          light: 'hsl(200 45% 55%)',
          dark: 'hsl(200 45% 35%)',
        },
        accent: {
          DEFAULT: 'hsl(15 80% 50%)',
          light: 'hsl(15 80% 60%)',
          dark: 'hsl(15 80% 40%)',
        },
        light: {
          background: 'hsl(0 0% 100%)',
          foreground: 'hsl(220 20% 20%)',
          card: 'hsl(0 0% 98%)',
          muted: 'hsl(220 20% 94%)',
          'muted-foreground': 'hsl(220 10% 40%)',
          border: 'hsl(220 20% 90%)',
        },
        dark: {
          // Updated darker theme colors
          background: 'hsl(220 20% 9%)', // Darker background
          foreground: 'hsl(220 20% 90%)',
          card: 'hsl(220 20% 12%)', // Darker card background
          muted: 'hsl(220 20% 16%)', // Darker muted background
          'muted-foreground': 'hsl(220 20% 70%)',
          border: 'hsl(220 20% 18%)', // Darker border
        },
      },
    },
  },
  plugins: [],
};
