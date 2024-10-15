import TailwindForm from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				hind: ['hind', 'base']
			}
		}
	},
	plugins: [
		TailwindForm({
			strategy: 'base'
		})
	]
};
