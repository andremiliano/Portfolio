/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        elevated: "rgb(var(--elevated) / <alpha-value>)",
        primary: "rgb(var(--text) / <alpha-value>)",
        secondary: "rgb(var(--text-2) / <alpha-value>)",
        tertiary: "rgb(var(--text-3) / <alpha-value>)",
        separator: "rgb(var(--separator) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 20px rgb(var(--shadow) / 0.06)',
        lift: '0 12px 34px rgb(var(--shadow) / 0.12)',
        float: '0 8px 28px rgb(var(--shadow) / 0.14)',
      },
    },
  },
  plugins: [],
}
