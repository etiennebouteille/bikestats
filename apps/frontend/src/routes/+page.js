import { error } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export async function load({ fetch, params }) {
	const pb = new PocketBase('http://bikestatsapi.etiennebouteille.com');
	const resultList = await pb.collection('dates').getList(1, 50, {
		filter: 'created >= "2022-01-01 00:00:00"',
		expand: 'bike'
	});
	return {
		commutes: resultList.items
	};
}
