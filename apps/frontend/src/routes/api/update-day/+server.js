import { json, error } from '@sveltejs/kit';

export async function POST({ request, locals, url }) {
	const reqBody = await request.json();
    if(!reqBody.dayid){
        throw error(400, 'Missing day id')
    }
	console.log('received update day request : ', reqBody);
	const payload = {
		...reqBody,
	};
	let res = await locals.pb.collection('dates').update(reqBody.dayid, payload);
	return json(res);
}
