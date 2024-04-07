import prisma from '$lib/prisma';
// import { UserPodType } from '@prisma/client';
import { redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

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

// export const actions: Actions = {
// 	createPod: async (event) => {
// 		const formData = await event.request.formData();
// 		const name = formData.get('name');
// 		const description = formData.get('description');
// 		const username = event.locals.user?.username;

// 		await prisma.pod.create({
// 			data: {
// 				name: name as string,
// 				description: description as string,
// 				userPods: {
// 					create: {
// 						user: {
// 							connect: {
// 								username: username as string
// 							}
// 						},
// 						type: UserPodType.STANDARD
// 					}
// 				}
// 			}
// 		});

// 		redirect(302, '/');
// 	}
// };
