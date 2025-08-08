/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // This ensures it scans all your component files
    ],
    theme: {
        extend: {
            // This is where we can extend the theme if needed in the future
        },
    },
    plugins: [],
}