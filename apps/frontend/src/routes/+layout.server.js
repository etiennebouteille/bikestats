export const load = ({ locals }) => {
	// console.log('loadin, locals : ', locals);
	if (locals.user) {
		return {
			user: locals.user
		};
	}

	return {
		user: undefined
	};
};
