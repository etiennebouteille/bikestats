import { error, redirect } from '@sveltejs/kit';

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

export const actions = {
	update: async ({ request, locals, url }) => {
		const body = Object.fromEntries(await request.formData());

		const bodyAsArray = Object.entries(body)
		const data = Object.fromEntries(bodyAsArray.filter(([key, value]) => value !== ''))
		
		const res = await locals.pb.collection('trajets').update(url.searchParams.get('id'), data);

		//TODO : check succes
		//TODO : add use:enhance and return list of trajets

		return { success: true };
	}
};
