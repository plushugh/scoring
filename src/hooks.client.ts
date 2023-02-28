import { PUBLIC_SENTRY_DSN } from '$env/static/public';
import { currentUser, pb } from '$lib/pocketbase';

import * as SentrySvelte from '@sentry/svelte';
import type { HandleClientError } from '@sveltejs/kit';

import { serializeNonPOJOs } from '$lib/utils';
import { BrowserTracing } from '@sentry/tracing';

SentrySvelte.init({
	dsn: PUBLIC_SENTRY_DSN,
	integrations: [
		new BrowserTracing(),
		new SentrySvelte.Replay({
			maskAllText: true,
			blockAllMedia: true
		})
	],

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,

	// You may want this to be 100% while
	// in development and sample at a lower rate in production
	replaysSessionSampleRate: 1.0,

	// If the entire session is not sampled, use the below sample rate to sample
	// sessions when an error occurs.
	replaysOnErrorSampleRate: 1.0
});

pb.authStore.loadFromCookie(document.cookie);
pb.authStore.onChange(() => {
	currentUser.set(serializeNonPOJOs(pb.authStore.model));
	document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
});

export const handleError = (({ error, event }) => {
	const errorId = crypto.randomUUID();

	if (!(event.route.id === null)) {
		// Not a 404
		SentrySvelte.captureException(error, {
			contexts: { sveltekit: { event, errorId } }
		});

		return {
			message: "An error occurred, we've been notified and will fix it as soon as possible.",
			errorId
		};
	} else {
		return {
			message: 'Page Not Found',
			errorId: 'NOT_FOUND'
		};
	}
}) satisfies HandleClientError;
