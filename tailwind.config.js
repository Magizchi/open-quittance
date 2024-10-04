/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'hind':['hind','base']
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'base',
    })
  ],
}

