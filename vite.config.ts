import { sentryVitePlugin } from '@sentry/vite-plugin';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
	return {
		plugins: [
			sveltekit(),
			sentryVitePlugin({
				org: process.env.SENTRY_ORG,
				project: process.env.SENTRY_PROJECT,

				// Specify the directory containing build artifacts
				include: './build',

				// Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
				// and need `project:releases` and `org:read` scopes
				authToken: process.env.SENTRY_AUTH_TOKEN
			})
		],
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
