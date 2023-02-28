import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
	return {
		plugins: [sveltekit()],
		build: {
			sourcemap: true
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "src/variables.scss" as *;'
				}
			}
		}
	};
});
