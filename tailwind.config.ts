import type { Config } from "tailwindcss";

/**
 * Tokens lifted directly from WEBSITE-LST (Figma file wl7UTHhGhmKRLqiwzha4eg).
 * Frames: sample_ecommerce-mobile-5 (414w) / sample_ecommerce-desktop-5 (1440w).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#252B42", // headings, primary text
        muted: "#737373", // body copy
        primary: "#23A6F0", // links, buttons
        "primary-soft": "#8EC2F2",
        green: "#23856D", // top bar, sale price
        success: "#2DC071",
        danger: "#E74040", // "NEW" badge
        warning: "#F3CD03", // star rating
        light: "#FAFAFA",
        "gray-line": "#E6E6E6",
        "gray-soft": "#BDBDBD",
        "gray-mid": "#C4C4C4",
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing }] — exact from Figma text styles
        "12": ["12px", { lineHeight: "16px", letterSpacing: "0.2px" }],
        "14": ["14px", { lineHeight: "20px", letterSpacing: "0.2px" }],
        "14t": ["14px", { lineHeight: "24px", letterSpacing: "0.2px" }],
        "16": ["16px", { lineHeight: "24px", letterSpacing: "0.1px" }],
        "20": ["20px", { lineHeight: "30px", letterSpacing: "0.2px" }],
        "24": ["24px", { lineHeight: "32px", letterSpacing: "0.1px" }],
        "30": ["30px", { lineHeight: "45px", letterSpacing: "0.2px" }],
        "40": ["40px", { lineHeight: "50px", letterSpacing: "0.2px" }],
      },
      maxWidth: {
        container: "1050px", // dominant desktop container
        wide: "1146px", // category grid section
      },
    },
  },
  plugins: [],
};

export default config;
