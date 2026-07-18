/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // --- Stitch UI Colors ---
        "on-tertiary": "#ffffff",
        "secondary-fixed-dim": "#d0bcff",
        "on-tertiary-fixed": "#131b2e",
        "surface-variant": "#e0e3e5",
        "surface-container-high": "#e6e8ea",
        "secondary-container": "#8455ef",
        "on-primary-fixed-variant": "#2f2ebe",
        "on-secondary-container": "#fffbff",
        "on-secondary": "#ffffff",
        "on-primary": "#ffffff",
        "tertiary-container": "#6c748b",
        "primary-fixed": "#e1e0ff",
        "surface-container": "#eceef0",
        "surface": "#f7f9fb",
        "on-background": "#191c1e",
        "surface-bright": "#f7f9fb",
        "on-error-container": "#93000a",
        "on-primary-fixed": "#07006c",
        "error-container": "#ffdad6",
        "on-tertiary-container": "#fefcff",
        "outline-variant": "#c7c4d7",
        "primary-fixed-dim": "#c0c1ff",
        "error": "#ba1a1a",
        "on-tertiary-fixed-variant": "#3f465c",
        "surface-tint": "#494bd6",
        "on-surface-variant": "#464554",
        "primary": "#4648d4",
        "surface-container-low": "#f2f4f6",
        "on-secondary-fixed-variant": "#5516be",
        "tertiary-fixed-dim": "#bec6e0",
        "secondary-fixed": "#e9ddff",
        "on-secondary-fixed": "#23005c",
        "background": "#f7f9fb",
        "on-primary-container": "#fffbff",
        "on-error": "#ffffff",
        "secondary": "#6b38d4",
        "tertiary": "#545c72",
        "surface-dim": "#d8dadc",
        "inverse-on-surface": "#eff1f3",
        "surface-container-lowest": "#ffffff",
        "on-surface": "#191c1e",
        "primary-container": "#6063ee",
        "surface-container-highest": "#e0e3e5",
        "inverse-primary": "#c0c1ff",
        "outline": "#767586",
        "inverse-surface": "#2d3133",
        "tertiary-fixed": "#dae2fd"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // --- Stitch UI Border Radius overrides (will be accessed via arbitrary or explicitly added here if needed) ---
        "xl": "0.75rem",
      },
      spacing: {
        "margin-desktop": "40px",
        "gutter": "24px",
        "unit": "4px",
        "stack-lg": "32px",
        "stack-md": "16px",
        "container-max": "1280px",
        "stack-sm": "8px"
      },
      fontFamily: {
        "display-lg": ["Inter", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "headline-lg": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"]
      },
      fontSize: {
        "display-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "label-sm": ["12px", {"lineHeight": "1", "letterSpacing": "0.04em", "fontWeight": "600"}],
        "body-lg": ["18px", {"lineHeight": "1.6", "letterSpacing": "0", "fontWeight": "400"}],
        "headline-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600"}],
        "label-md": ["14px", {"lineHeight": "1", "letterSpacing": "0.02em", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "1.5", "letterSpacing": "0", "fontWeight": "400"}],
        "headline-md": ["24px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}],
        "body-sm": ["14px", {"lineHeight": "1.5", "letterSpacing": "0", "fontWeight": "400"}]
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}
