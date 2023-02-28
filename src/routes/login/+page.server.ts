import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData()) as {
			username: string;
			password: string;
		};

		if (!data.username || !data.password)
			return fail(400, { username: data.username, type: 'MISSING' });

		try {
			await locals.pb.collection('recorders').authWithPassword(data.username, data.password);
		} catch (e) {
			return fail(401, { username: data.username, type: 'INVALID' });
		}

		throw redirect(303, '/');
	}
} satisfies Actions;
