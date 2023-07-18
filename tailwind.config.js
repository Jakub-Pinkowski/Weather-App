/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            'weather-primary': '#1E213A',
            'weather-secondary': '#100E1D'
        },
        fontFamily: {
            Roboto: ['Roboto', 'sans-serif']
        },
        container: {
            padding: '2rem',
            center: true
        },
        screens: {
            sm: '640px',
            md: '768px'
        }
    },
    plugins: []
}
