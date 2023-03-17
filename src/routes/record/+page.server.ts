import { serializeNonPOJOs } from '$lib/utils';
import { fail } from '@sveltejs/kit';
import type { HousesResponse, RecordsRecord, StudentsResponse } from 'src/pocketbase-types';
import type { Actions } from './$types';

export const actions = {
	default: async ({ locals, request }) => {
		if (!locals.user) return fail(401, { type: 'UNAUTHORIZED' });

		try {
			const data = Object.fromEntries(await request.formData()) as {
				cardNumber: string;
				score: string;
			};

			console.log(data);

			if (!data.score) return fail(400, { cardNumber: data.cardNumber, type: 'MISSING' });
			if (!data.cardNumber) return fail(400, { score: data.score, type: 'MISSING' });

			if (isNaN(parseInt(data.score))) return fail(400, { score: data.score, type: 'INVALID' });
			if (isNaN(parseInt(data.cardNumber)))
				return fail(400, { cardNumber: data.cardNumber, type: 'INVALID' });
			if (
				parseInt(data.score) !== 5 &&
				parseInt(data.score) !== 10 &&
				parseInt(data.score) !== 20 &&
				parseInt(data.score) !== 30
			)
				return fail(400, { score: data.score, type: 'INVALID' });

			try {
				const student = serializeNonPOJOs(
					await locals.pb
						.collection('students')
						.getFirstListItem<StudentsResponse>(`cardNumber='${data.cardNumber}'`)
				);

				await locals.pb.collection('students').update<StudentsResponse>(student.id, {
					score: (student.score || 0) + parseInt(data.score)
				});

				const house = serializeNonPOJOs(
					await locals.pb
						.collection('houses')
						.getFirstListItem<HousesResponse>(`name='${student.house}'`)
				);
				await locals.pb.collection('houses').update<HousesResponse>(house.id, {
					score: (house.score || 0) + parseInt(data.score)
				});

				try {
					// LOG RECORD
					await locals.pb.collection('records').create<RecordsRecord>({
						action: 'increase',
						change: parseInt(data.score),
						student: student.id,
						recorder: locals.user.id
					});
				} catch (e) {
					console.log(e);
					console.log('Failed to log record: ', {
						action: 'increase',
						change: parseInt(data.score),
						student: student.id,
						recorder: locals.user.id
					});
				}

				return {
					name: student.name,
					house: house.name,

					score: parseInt(data.score)
				};
			} catch (e) {
				return fail(401, { cardNumber: data.cardNumber, type: 'INVALID' });
			}
		} catch (e) {
			return fail(400, { type: 'INVALID' });
		}
	}
} satisfies Actions;
