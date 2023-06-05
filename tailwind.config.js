/** @type {import("tailwindcss").Config} */

export default {
    content: [
        "./src/**/*.{html,js,svelte,ts}"
    ],
    theme: {
        colors: {
            "ssgreen": "#629a40"
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

