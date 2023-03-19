import { PUBLIC_SENTRY_DSN } from '$env/static/public';
import { pb } from '$lib/pocketbase';
import { serializeNonPOJOs } from '$lib/utils';
import * as SentryNode from '@sentry/node';
import type { Handle, HandleServerError } from '@sveltejs/kit';
import crypto from 'crypto';

SentryNode.init({
	dsn: PUBLIC_SENTRY_DSN
});

export const handle: Handle = async ({ event, resolve }) => {
	// before
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (pb.authStore.isValid) {
		try {
			await pb.collection('recorders').authRefresh();
		} catch (_) {
			pb.authStore.clear();
		}
	}

	event.locals.pb = pb;
	event.locals.user = serializeNonPOJOs(pb.authStore.model);

	const response = await resolve(event);

	// after resolve()
	response.headers.set(
		'set-cookie',
		pb.authStore.exportToCookie({ httpOnly: false, secure: false })
	);

	return response;
};

export const handleError = (({ error, event }) => {
	const errorId = crypto.randomUUID();
	if (!(event.route.id === null)) {
		// Not a 404
		SentryNode.captureException(error, {
			contexts: {
				sveltekit: {
					event,
					errorId
				}
			}
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
}) satisfies HandleServerError;
