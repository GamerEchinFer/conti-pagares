/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*/.{tsx, jsx, ts, html, js}",
  ],
  theme: {
    extend: {},
    // screens: {                                
    //   sm: '480px',
    //   md: '768px',
    //   lg: '976px',
    //   xl: '1440px',
    //   'tablet': '640px',
    //   'laptop': '1024px',
    //   'desktop': '1280px',
    //   'otherApps': '1920px'
    // }
  },
  plugins: [],
}
