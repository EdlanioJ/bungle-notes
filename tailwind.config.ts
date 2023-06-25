import { type Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        body: 'max-content 1fr',
      },
    },
  },
  plugins: [],
} satisfies Config
