/** @type {import("tailwindcss").Config} */
const colors = require("tailwindcss/colors")

export default {
    content: [
        "./src/**/*.{html,js,svelte,ts}"
    ],
    theme: {
        colors: {
            ...colors,
            "ssgreen": "#629a40",
            "ssdarkgreen": "#344731"
        },
        extend: {
            fontFamily: {
                "sans": "Inter, Helvetica, Arial, sans-serif",
                "logo": "Alumni Sans"
            }
        },
    },
    plugins: [],
}

