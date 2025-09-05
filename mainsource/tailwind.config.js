/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Oswald: ["Oswald"],
        Poppins: ["Poppins"],
        mulish: ["Mulish", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        dmSans: ["'DM Sans'", "sans-serif"],
        jost: ["Jost", "sans-serif"],
        rancho: ["Rancho", "cursive"],
        nunito: ['"Nunito Sans"', "sans-serif"],
        jakarta: ['"Plus Jakarta Sans"', "sans-serif"],
        PlusJakartaSansMedium: ["PlusJakartaSansMedium", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        shine: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out forwards",
        shine: "shine 3s linear infinite",
      },
    },
  },
  plugins: [],
};
