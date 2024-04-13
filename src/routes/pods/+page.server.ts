import prisma from '$lib/prisma';
// import { UserPodType } from '@prisma/client';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;
	const pods = await prisma.pod.findMany({
		include: {
			users: {
				where: {
					username: user?.username
				}
			}
		}
	});

	return { pods };
};
