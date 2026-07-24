/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EEF1EC",
        card: "#F7F8F5",
        line: "#D7DCD3",
        ink: {
          50: "#EEF1EC",
          200: "#C7D0C9",
          400: "#7C8B82",
          500: "#5B6A61",
          700: "#33453F",
          900: "#14231F",
        },
        pine: {
          50: "#E7F1EE",
          100: "#CBE2DB",
          400: "#1E8A73",
          500: "#0F6B5C",
          600: "#0B5548",
          700: "#083F36",
        },
        amber: {
          50: "#FBF1DE",
          100: "#F3DFAF",
          400: "#DA9E1F",
          500: "#C98A2B",
          600: "#A56E1D",
        },
      },
      fontFamily: {
        display: ["\"Fraunces\"", "ui-serif", "Georgia", "serif"],
        sans: ["\"IBM Plex Sans\"", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["\"IBM Plex Mono\"", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        sm2: "0.25rem",
      },
    },
  },
  plugins: [],
};
