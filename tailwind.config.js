/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#004d7a",         // Azul: confianza y tecnología
        secondary: "#f97316",       // Naranja: acción y cercanía
        success: "#22c55e",         // Verde: solución y confianza
        neutral: "#2c3e50",         // Gris oscuro para textos o fondo
        background: "#f5f7fa",      // Fondo claro por defecto
        "text-light": "#e5e7eb",    // Texto claro sobre fondos oscuros
        accent: "#00d9a6",          // Detalles y botones llamativos
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          xl: "1280px",
          "2xl": "1440px",
        },
      },
      boxShadow: {
        soft: "0 4px 14px rgba(0, 0, 0, 0.05)",
        card: "0 10px 25px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        md: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
      },
      spacing: {
        section: "6rem",
        container: "1rem",
      },
    },
  },
  plugins: [],
};
