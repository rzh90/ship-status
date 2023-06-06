/** @type {import("tailwindcss").Config} */
const colors = require("tailwindcss/colors")

export default {
    darkMode: "class",
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        require('path').join(require.resolve(
            "@skeletonlabs/skeleton"),
            "../**/*.{html,js,svelte,ts}"
        )
    ],
    theme: {
        extend: {
            fontFamily: {
                "sans": "Inter, Helvetica, Arial, sans-serif",
                "logo": "Alumni Sans"
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        ...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
    ],
}

