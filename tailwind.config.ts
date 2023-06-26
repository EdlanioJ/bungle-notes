import { type Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        body: 'max-content 1fr',
      },
      boxShadow: {
        custom: '0px 4px 16px rgba(22, 22, 22, 0.1)',
      },
    },
  },
  plugins: [],
} satisfies Config
