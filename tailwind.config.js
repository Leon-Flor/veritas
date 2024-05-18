import { nextui } from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: "red", // Rojo
            secondary: "#FFA500", // Naranja
            background: "#F0F0F0", // Gris claro
          },
        },
        dark: {
          colors: {
            primary: "#7986CB", // Azul
            secondary: "#C5CAE9", // Azul claro
            background: "#303030", // Gris oscuro
          },
        },
      },
    }),
  ],
};
