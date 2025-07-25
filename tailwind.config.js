/** @type {import('tailwindcss').Config} */
import flowbitePlugin from "flowbite/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // (optional, for flowbite-react components)
  ],
  theme: {
    extend: {
      colors: {
        main: "#4FA74F",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [flowbitePlugin],
};
