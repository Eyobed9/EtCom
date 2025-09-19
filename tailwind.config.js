/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",  
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", 
    "./src/**/*.{js,ts,jsx,tsx,mdx}",  
  ],
  theme: {
    extend: {
      colors: {
        midnightblue: "#09174b",
        whitesmoke: "#f0f0f0",
        gray: "rgba(0, 0, 0, 0.4)",
      },
      fontFamily: {
        arial: "Arial",
        "arial-rounded-mt-bold": "Arial Rounded MT Bold",
        "power-geez-unicode1": "Power Geez Unicode1",
      },
    },
  },
  // corePlugins: {
  //   preflight: false,
  // }
};
