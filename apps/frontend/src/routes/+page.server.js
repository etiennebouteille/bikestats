import { error } from '@sveltejs/kit';
import { getDate } from 'date-fns';
import PocketBase from 'pocketbase';

export async function load({ fetch, params, locals }) {
	console.log('load function');

	const getDates = async (userid) => {
		try {
			const resultList = await locals.pb.collection('dates').getFullList(undefined, {
				filter: `user = "${userid}"`,
				expand: 'bike'
			});
			return structuredClone(resultList);
		} catch (e) {
			console.log('error : ', e);
			throw error('Could not get data : ', e);
		}
	};

	// const pb = new PocketBase('https://bikestatsapi.etiennebouteille.com');
	// const resultList = await pb.collection('dates').getList(1, 50, {
	// 	filter: 'created >= "2022-01-01 00:00:00"',
	// 	expand: 'bike'
	// });
	// return {
	// 	commutes: resultList.items
	// };
	return {
		commutes: getDates(locals.user.id)
	};
}
