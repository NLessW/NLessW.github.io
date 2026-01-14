/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Pretendard', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                neon: '#00ff9d',
                dark: '#0b1120',
                card: '#1e293b',
            },
            animation: {
                blink: 'blink 1s step-end infinite',
            },
            keyframes: {
                blink: { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0 } },
            },
        },
    },
    plugins: [],
};
