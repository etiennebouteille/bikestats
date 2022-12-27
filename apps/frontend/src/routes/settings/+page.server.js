import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.pb.authStore.isValid) {
		return {};
	}

	const getTrajets = async (userid) => {
		try {
			const resultList = await locals.pb.collection('trajets').getFullList(undefined, {
				filter: `user = "${userid}"`
			});
			return structuredClone(resultList);
		} catch (e) {
			console.log('error : ', e);
			throw error('Could not get data : ', e);
		}
	};

	return {
		trajets: getTrajets(locals.user.id)
	};
}
