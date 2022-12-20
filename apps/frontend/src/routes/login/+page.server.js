import { redirect, error } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			const connec = await locals.pb
				.collection('users')
				.authWithPassword(body.username, body.password);
			console.log({ connec });
		} catch (e) {
			console.log(e);
			throw error(500, 'could not log in');
		}
		throw redirect(303, '/');
	}
};
