import PocketBase from 'pocketbase';

export async function handle({ event, resolve }) {
	// event.locals.pb = new PocketBase('http://127.0.0.1:8090');
	event.locals.pb = new PocketBase('https://bikestatsapi.etiennebouteille.com');

	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	event.locals.user = undefined;
	try {
		event.locals.pb.authStore.isValid && (await event.locals.pb.collection('users').authRefresh());
		event.locals.user = structuredClone(event.locals.pb.authStore.model);
	} catch (e) {
		console.log('clearing : ', e);
		event.locals.pb.authStore.clear();
	}

	const response = await resolve(event);

	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ httpOnly: false }));

	return response;
}
