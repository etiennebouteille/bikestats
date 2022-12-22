import { error } from '@sveltejs/kit';
import { getDate } from 'date-fns';
import PocketBase from 'pocketbase';

export async function load({ fetch, params, locals }) {
	console.log('load function');
	if (!locals.pb.authStore.isValid) {
		return {};
	}

	const getDates = async (userid) => {
		try {
			const resultList = await locals.pb.collection('dates').getFullList(undefined, {
				filter: `user = "${userid}"`,
				expand: 'bike,trajet'
			});
			return structuredClone(resultList);
		} catch (e) {
			console.log('error : ', e);
			throw error('Could not get data : ', e);
		}
	};

	return {
		commutes: getDates(locals.user.id)
	};
}
