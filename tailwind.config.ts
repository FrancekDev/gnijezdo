import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bei: '#FAF2DB',
        blu: '#155287',
        secBlu: '#3b5dad',
        oli: '#9CB295',
        secOli: '#b1c8a7',
        del: '#ed7575',
        secDel: '#ff4646',
        gra: '#E6E4E0',
      },
    },
  },
  plugins: [],
};
export default config;
