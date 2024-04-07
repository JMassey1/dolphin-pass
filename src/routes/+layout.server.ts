import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { isLoggedIn, user } = event.locals;
	return { isLoggedIn, user };
};
