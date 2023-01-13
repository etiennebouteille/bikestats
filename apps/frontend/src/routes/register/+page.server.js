import { error, redirect } from '@sveltejs/kit';

export async function load({ fetch, params, locals }) {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}
}

export const actions = {
	register: async ({ event, locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		// TODO log the user in
		const userdata = {
			username: body.username,
			password: body.password,
			passwordConfirm: body.password,
			name: 'hello'
		};
		try {
			await locals.pb.collection('users').create(userdata);
			console.log('cration finished, connecting')
			await locals.pb.collection('users').authWithPassword(body.username, body.password);
		} catch (e) {
			console.log('failed to create user : ', e);
			throw Error(500, 'oops');
		}

		throw redirect(303, '/');
	}
};
