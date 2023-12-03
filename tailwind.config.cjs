/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Rubik', 'メイリオ', 'Noto Sans JP', 'sans-serif'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000000',
        white: '#ffffff',
        gray: {
          1: '#4a5f62',
          2: '#677d7f',
          3: '#34393e',
          4: '#676d72',
          5: '#96adb5',
          6: '#d3d9dc',
          7: '#e6e8eb',
        },
        green: {
          1: '#00a3a1',
          2: {
            1: '#3bcaa8',
            2: '#1e8cb2',
          },
          3: {
            1: '#41a49f',
            2: '#21739f',
          },
          4: '#528394',
          5: '#0c2e3e',
        },
        red: {
          1: '#e00001',
          2: '#fff8f9',
        },
        orange: {
          1: '#ff7a01',
          2: '#feebc9',
        },
        yellow: {
          1: '#ffca42',
          2: '#ffef99',
        },
        pink: {
          1: '#eb89e8',
        },
        blue: {
          1: '#589ae9',
          2: '#007fde',
        },
        background: {
          1: '#ffffff',
          2: '#edf6f7',
          3: '#f2f4f5',
          4: '#5c747c',
          5: '#050c13',
        },
      },
      // NOTE: グラデーションカラーはかなり複雑で長くなるのでこちらにまとめる
      // themeから上記で定義したカラーを使用できる。「colors.green.2.1」であれば→「#3bcaa9」のこと
      backgroundImage: (theme) => ({
        'button-primary-regular': `linear-gradient(180deg,  ${theme('colors.green.1')} 0%, ${theme(
          'colors.green.1',
        )} 100%)`,
        'button-primary-regular-hover': `linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), #00A3A0`,
        'gradient-button-primary': `linear-gradient(180deg,  ${theme(
          'colors.green.2.1',
        )} 0%, ${theme('colors.green.2.2')} 100%)`,
        'gradient-button-primary-hover': `linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(180deg, ${theme(
          'colors.green.2.1',
        )} 0%, ${theme('colors.green.2.2')} 100%)`,
      }),
      boxShadow: {
        sheet: '0px 2px 10px rgba(47, 71, 82, 0.15)',
        button: '0px 4px 10px rgba(48, 102, 121, 0.4)',
        popup: '0px 6px 20px rgba(47, 71, 82, 0.25)',
        overlay: '0px -10px 15px rgba(26, 73, 88, 0.1)',
        focus: '0px 2px 10px rgba(91, 105, 239, 0.6)',
      },
      borderRadius: {
        nav: '26px',
        modal: '18px',
        card: '8px',
        input: '6px',
        focus: '2px',
      },
      zIndex: {
        '-1': '-1',
        menu: 1000,
        sticky: 1020,
        fixed: 1030,
        modalBack: 1040,
        modalContent: 1050,
        tooltip: 1060,
      },
      keyframes: {
        cutin: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        cutout: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
      },
      animation: {
        cutin: 'cutin 150ms cubic-bezier(0.165, 0.84, 0.44, 1)',
        cutout: 'cutout 150ms cubic-bezier(.39, .575, .565, 1)',
      },
    },
  },
  plugins: [
    plugin((helpers) => {
      dataStateVariant('open', helpers);
      dataStateVariant('closed', helpers);
    }),
    plugin(({ addVariant }) => {
      addVariant('where', ':where(&)');
    }),
  ],
};

const dataStateVariant = (state, { addVariant, e }) => {
  addVariant(`data-state-${state}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`data-state-${state}${separator}${className}`)}[data-state='${state}']`;
    });
  });
};
