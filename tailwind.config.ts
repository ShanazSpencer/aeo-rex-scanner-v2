import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f1729',
        primary: '#00d9ff',
        secondary: '#ff0080',
        dark: '#0a0f1f',
        'dark-light': '#1a2332',
      },
    },
  },
  plugins: [],
}
export default config
