export const actions = {
	register: async ({ event, locals, request }) => {
		console.log('register???');
		const body = Object.fromEntries(await request.formData());
		console.log('action body : ', body);
		// TODO log the user in
		try {
			await locals.pb.collection('users').create();
		} catch (_) {
			console.log('failed');
		}
	}
};
