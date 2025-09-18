import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        fontSize: {
          tiny: "0.75rem",
          small: "0.875rem",
          medium: "1rem",
          large: "1.125rem",
        },
        radius: {
          small: "6px",
          medium: "8px",
          large: "12px",
        },
      },
      themes: {
        light: {
          colors: {
            background: {
              DEFAULT: "#FFFFFF"
            },
            content1: {
              DEFAULT: "#FFFFFF",
              foreground: "#11181C"
            },
            content2: {
              DEFAULT: "#f8f9fa",
              foreground: "#11181C"
            },
            content3: {
              DEFAULT: "#f1f3f5",
              foreground: "#11181C"
            },
            content4: {
              DEFAULT: "#e9ecef",
              foreground: "#11181C"
            },
            primary: {
              50: "#e6f1fe",
              100: "#cce3fd",
              200: "#99c7fb",
              300: "#66aaf9",
              400: "#338ef7",
              500: "#0070F3",
              600: "#005bc4",
              700: "#004493",
              800: "#002e62",
              900: "#001731",
              DEFAULT: "#0070F3",
              foreground: "#FFFFFF"
            },
            secondary: {
              50: "#f0eefe",
              100: "#e0ddfd",
              200: "#c1bbfb",
              300: "#a299f9",
              400: "#8377f7",
              500: "#6355f5",
              600: "#5044c4",
              700: "#3c3393",
              800: "#282262",
              900: "#141131",
              DEFAULT: "#6355f5",
              foreground: "#FFFFFF"
            }
          }
        },
        dark: {
          colors: {
            background: {
              DEFAULT: "#0F1115"
            },
            content1: {
              DEFAULT: "#161920",
              foreground: "#ECEDEE"
            },
            content2: {
              DEFAULT: "#1C202B",
              foreground: "#ECEDEE"
            },
            content3: {
              DEFAULT: "#232836",
              foreground: "#ECEDEE"
            },
            content4: {
              DEFAULT: "#2D3445",
              foreground: "#ECEDEE"
            },
            primary: {
              50: "#001731",
              100: "#002e62",
              200: "#004493",
              300: "#005bc4",
              400: "#0070F3",
              500: "#338ef7",
              600: "#66aaf9",
              700: "#99c7fb",
              800: "#cce3fd",
              900: "#e6f1fe",
              DEFAULT: "#338ef7",
              foreground: "#FFFFFF"
            },
            secondary: {
              50: "#141131",
              100: "#282262",
              200: "#3c3393",
              300: "#5044c4",
              400: "#6355f5",
              500: "#8377f7",
              600: "#a299f9",
              700: "#c1bbfb",
              800: "#e0ddfd",
              900: "#f0eefe",
              DEFAULT: "#8377f7",
              foreground: "#FFFFFF"
            }
          }
        }
      }
    })
  ]
}
