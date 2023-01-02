/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		// fontFamily:{
		// 	'rubik':[]
		// },
		extend: {}
	},
	plugins: [require('@tailwindcss/forms')]
};
