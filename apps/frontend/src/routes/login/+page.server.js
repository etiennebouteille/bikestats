import { redirect, error } from '@sveltejs/kit';

export async function load({ fetch, params, locals }) {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}
}

export const actions = {
	login: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			const connec = await locals.pb
				.collection('users')
				.authWithPassword(body.username, body.password);
		} catch (e) {
			console.log(e);
			throw error(500, 'could not log in');
		}
		throw redirect(303, '/');
	}
};
