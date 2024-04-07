import prisma from '$lib/prisma';
import ErrorTypes from '$lib/utils/errorTypes';
import { UserPodType } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.isLoggedIn) {
		redirect(302, '/login');
	}
	const podId = event.params.podId;
	const pod = await prisma.pod.findUnique({
		where: {
			id: podId as string
		}
	});
	return { pod };
};

export const actions: Actions = {
	inviteUserToPod: async (event) => {
		if (!event.locals.user) redirect(302, '/login');
		const formData = await event.request.formData();
		const podId = event.params.podId;
		console.log('pod id from param', podId);
		const username = formData.get('username');

		await prisma.userPod.create({
			data: {
				pod: {
					connect: {
						id: podId as string
					}
				},
				user: {
					connect: {
						username: username as string
					}
				},
				type: UserPodType.STANDARD
			}
		});

		redirect(302, '/');
	},

	postEchoToPod: async (event) => {
		if (!event.locals.user) {
			return fail(400, {
				message: ErrorTypes.NO_LOGIN.message,
				type: ErrorTypes.NO_LOGIN
			});
		}
		const postOwner = await prisma.user.findUnique({
			where: {
				id: event.locals.user.id
			}
		});
		if (!postOwner) {
			return fail(400, {
				message: ErrorTypes.USER_NOT_FOUND.message,
				type: ErrorTypes.USER_NOT_FOUND
			});
		}
		const formData = await event.request.formData();
		const title = formData.get('title');
		const description = formData.get('description');
		const username = formData.get('username');
		const password = formData.get('password');
		const createdDate = new Date();
		const expiration = formData.get('expiration') ?? null;

		await prisma.echo.create({
			data: {
				title: title as string,
				owner: {
					connect: {
						id: postOwner.id
					}
				},
				pod: {
					connect: {
						id: event.params.podId as string
					}
				},
				description: description as string,
				username: username as string,
				password: password as string,
				createdDate: createdDate as Date,
				expiration: expiration as Date | null
			}
		});
	}
};
