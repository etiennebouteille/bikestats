import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {
	console.log('post request new traj');
	let payload = await request.json();
	console.log('received add trajet request : ', payload);
	payload = {
		name: 'Nouveau trajet',
		distance: 10,
		user: locals.user.id
	};
	let res = await locals.pb.collection('trajets').create(payload);
	return json(res);
}
