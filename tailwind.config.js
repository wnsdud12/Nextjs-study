// tailwind.config.js
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ matchUtilities }) => {
      const pxToVW = (px, base) => `${(px / base * 100).toFixed(3)}vw`;
    
      const keys = {
        w: 'width',
        h: 'height',
        p: 'padding',
        pt: 'padding-top',
        pr: 'padding-right',
        pb: 'padding-bottom',
        pl: 'padding-left',
        m: 'margin',
        mt: 'margin-top',
        mr: 'margin-right',
        mb: 'margin-bottom',
        ml: 'margin-left',
        text: 'font-size',
      };
      const values = Array.from({ length: 2000 }, (_, i) => `${i}`);

    
      for (const [prefix, cssProp] of Object.entries(keys)) {
        // vw-w-300
        matchUtilities(
          {
            [`pc-${prefix}`]: (value) => ({
              [cssProp]: `${value}px`, // 기본: 1920 이상은 px
              '@media (max-width: 1920px)': {
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
              '@media (max-width: 768px)': {
                [cssProp]: pxToVW(parseInt(value), 768),
              },
            }),
          },
          { values }
        );
      }
    })
    
  ],
};

export default config;