// tailwind.config.js
import plugin from "tailwindcss/plugin";

/**
 * 컬러 이름과 RGB 값을 받아 rgba 컬러 단계(5%, 10%, ..., 100%)를 자동 생성
 */
const generateAlphaColors = (baseName, rgb, steps = [5, 10, 20, 30, 50, 70, 100]) => {
  return steps.reduce((acc, percent) => {
    const alpha = (percent / 100).toFixed(2);
    acc[`${baseName}-${alpha}`] = `rgba(${rgb}, ${alpha})`;
    return acc;
  }, {});
};

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: "#A50034", // LG RED
        gray: "#6B6B6B", // LG Gray
        white: "#FFFFFF", // LG White
        pink: "#EC008B", // LG Pink
        teal: "#0096AA", // LG Teal
        orange: "#E97300", // LG Orange
        purple: "#61279E", // LG Purple
        lightTeal: "#3CD5AF", // LG Light Teal
        yellow: "#FFDA27", // LG Yellow
        lightPurple: "#B150C5", // LG Light Purple
        lightGray: "rgb(217, 218, 219)", // LG Light Gray
        black: "#1D1D1B", // LG Black
        silverMetallic: "#8A8C8F", // LG Silver Metalilc
        goldMetallic: "#B49759", // LG Gold Metalilc
        bgGray: "#F8F8F8", // BG-gray
        bg: "#FFF8F8", // BG
        buttonGray: "#EDEDED", // 취소, 목록 버튼의 배경 gray
        textColorBlack: "#000000", // var(--text-color-1-black)
        textColorWhite: "#FFFFFF", // var(--text-color-1-white)
        transparent: "transparent", // 투명
        borderline: "#D9D9D9", // Borderline color
        buttonBorderLine: "#D9DADB", // 매장 버튼 border 컬러
        // Opacity Variants (camelCase base names)
        ...generateAlphaColors('red', '165,0,52'),
        ...generateAlphaColors('gray', '107,107,107'),
        ...generateAlphaColors('white', '255,255,255'),
        ...generateAlphaColors('black', '29,29,27'),
        ...generateAlphaColors('pink', '236,0,139'),
        ...generateAlphaColors('teal', '0,150,170'),
        ...generateAlphaColors('orange', '233,115,0'),
        ...generateAlphaColors('purple', '97,39,158'),
        ...generateAlphaColors('lightTeal', '60,213,175'),
        ...generateAlphaColors('yellow', '255,218,39'),
        ...generateAlphaColors('lightPurple', '177,80,197'),
        ...generateAlphaColors('lightGray', '217,218,219'),
        ...generateAlphaColors('silverMetallic', '138,140,143'),
        ...generateAlphaColors('goldMetallic', '180,151,89'),
        ...generateAlphaColors('bgGray', '248,248,248'),
        ...generateAlphaColors('bg', '255,248,248'),
        ...generateAlphaColors('buttonGray', '237,237,237'),
        ...generateAlphaColors('textColorBlack', '0,0,0'),
        ...generateAlphaColors('textColorWhite', '255,255,255'),
        ...generateAlphaColors('borderline', '217,217,217'),
        ...generateAlphaColors('buttonBorderLine', '217,218,219'),
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities }) => {
      const pxToVW = (px, base) => `${((px / base) * 100).toFixed(3)}vw`;

      const keys = {
        w: "width",
        h: "height",
        left: "left",
        right: "right",
        top: "top",
        bottom: "bottom",
        g: "gap",
        p: "padding",
        py: "padding-block",
        px: "padding-inline",
        pt: "padding-top",
        pr: "padding-right",
        pb: "padding-bottom",
        pl: "padding-left",
        m: "margin",
        mt: "margin-top",
        mr: "margin-right",
        mb: "margin-bottom",
        ml: "margin-left",
        text: "font-size",
      };
      const values = Array.from({ length: 2000 }, (_, i) => `${i}`);

      for (const [prefix, cssProp] of Object.entries(keys)) {
        // vw-w-300
        matchUtilities(
          {
            [`pc-${prefix}`]: (value) => ({
              [cssProp]: `${value}px`, // 기본: 1920 이상은 px
              "@media (max-width: 1920px)": {
                [cssProp]: pxToVW(parseInt(value), 1920), // 1919 이하는 vw
              },
            }),
          },
          { values }
        );

        // vw-w-sm-400
        matchUtilities(
          {
            [`mo-${prefix}-sm`]: (value) => ({
              "@media (max-width: 768px)": {
                [cssProp]: pxToVW(parseInt(value), 768),
              },
            }),
          },
          { values }
        );
      }
    }),
  ],
};

export default config;
