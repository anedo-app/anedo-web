/** @type {import('tailwindcss').Config} */

import colors from "./src/styles/colors";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors,
    },
    fontFamily: {
      heading: ["Archivo", "sans-serif"],
      body: ["Roboto", "sans-serif"],
    },
    fontSize: {
      "mega-title": [
        "3rem",
        {
          fontWeight: "700",
        },
      ],
      "big-title": [
        "2.5rem",
        {
          fontWeight: "700",
        },
      ],
      title: [
        "2rem",
        {
          fontWeight: "700",
        },
      ],
      "small-title": [
        "1.5rem",
        {
          fontWeight: "700",
        },
      ],
      "call-out": [
        "1.125rem",
        {
          fontWeight: "500",
        },
      ],
      body: "1rem",
      tag: "0.875rem",
      "small-stuff": "0.75rem",
    },
  },
  plugins: [],
};
