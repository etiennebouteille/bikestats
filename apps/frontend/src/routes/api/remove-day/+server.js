import { json } from '@sveltejs/kit';

export async function DELETE({ url, locals }) {
	const day = url.searchParams.get('day');
	let res = await locals.pb.collection('dates').delete(day);
	return json(res);
}
