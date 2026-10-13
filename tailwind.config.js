/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["media"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--ink)",
        muted: { foreground: "var(--muted)" },
        clay: "var(--orange)",
        slab: "var(--slab)",
      },
      fontFamily: {
        heading: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Sometype Mono", "JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
}
