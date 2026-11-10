/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0D1B2A', 2: '#24364A', 3: '#5B6B7C' },
        mist: '#EEF3F2',
        sheet: '#FBFCFA',
        line: '#D5DEDC',
        teal: { DEFAULT: '#0E7C6B', 2: '#0A5C50', soft: '#D7EFE9' },
        marker: '#FFE15A',
        aqua: '#56C7B3',
        amber: '#FFC86B',
        muted: '#9FB6B6',
        night: '#0A1016',
        flag: '#C2410C',
        flagsoft: '#FDEBDD',
      },
      borderRadius: { '2xl': '12px', '3xl': '14px' },
      fontFamily: {
        display: ['Onest', 'system-ui', 'sans-serif'],
        sans: ['Onest', 'system-ui', 'Segoe UI', 'sans-serif'],
        hand: ['Caveat', 'Comic Sans MS', 'cursive'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
