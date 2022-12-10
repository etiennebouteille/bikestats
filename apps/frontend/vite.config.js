import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'flytta512.png'],
			manifest: {
				name: 'Flytta - mobilité durable',
				short_name: 'Flytta',
				description: 'Super app pour tracker ses déplacements à vélo',
				theme_color: '#f0f6ee',
				icons: [
					{
						src: 'android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'flytta512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		})
	]
};

export default config;
