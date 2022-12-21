import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {
	let payload = await request.json();
	console.log('received add day request : ', payload);
	payload = {
		...payload,
		user: locals.user.id
	};
	let res = await locals.pb.collection('dates').create(payload, { expand: 'bike' });
	return json(res);
}
