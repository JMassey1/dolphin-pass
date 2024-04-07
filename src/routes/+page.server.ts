import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.isLoggedIn) {
		redirect(302, '/login');
	} else {
		redirect(302, '/pods');
	}
};
