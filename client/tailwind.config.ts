import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /^(caret|border|bg)-(theme-(pink|blue|green))$/,
      variants: ["focus"],
    },
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "theme-pink": "#E854AC",
        "theme-blue": "#5193E0",
        "theme-green": "#49C7B0",
      },
    },
  },
  plugins: [],
};

export default config;
