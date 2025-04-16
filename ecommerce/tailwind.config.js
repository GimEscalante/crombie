// tailwind.config.js

module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
          fontFamily: {
            heading: ['"Nico Moji"', 'cursive'],
            body: ['var(--font-noto-sans-jp)', 'sans-serif'],
          },
          colors: {
            beige: '#FAF3E3',
            orangeAccent: '#F26C3A',
            deepBlue: '#2B2E4A',
          },
        },
      },
    plugins: [],
  };
  