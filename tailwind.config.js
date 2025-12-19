/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#2563eb',
                'background-light': '#ffffff',
                'background-dark': '#0f172a',
                'surface-light': '#f8fafc',
                'surface-dark': '#1e293b',
                'text-main': '#0d131b',
                'text-sub': '#4c6c9a',
                'border-color': '#e7ecf3',
            },
            fontFamily: {
                display: ['Inter', 'system-ui', 'sans-serif'],
            },
            container: {
                center: true,
                padding: '2rem',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}