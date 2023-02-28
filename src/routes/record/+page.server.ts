import { serializeNonPOJOs } from '$lib/utils';
import { fail } from '@sveltejs/kit';
import type { HousesResponse, StudentsResponse } from 'src/pocketbase-types';
import type { Actions } from './$types';

export const actions = {
	default: async ({ locals, request }) => {
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
				parseInt(data.score) !== 1 &&
				parseInt(data.score) !== 2 &&
				parseInt(data.score) !== 3 &&
				parseInt(data.score) !== 4 &&
				parseInt(data.score) !== 5
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
