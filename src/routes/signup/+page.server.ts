import prisma from '$lib/prisma';
import { lucia } from '$lib/server/auth';
import ErrorTypes from '$lib/utils/errorTypes';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		console.log(`SIGN UP username: ${username}, password: ${password}`);
		// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
		// keep in mind some database (e.g. mysql) are case insensitive
		if (
			typeof username !== 'string' ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			// bad username
			return fail(400, {
				message: 'Invalid username',
				type: ErrorTypes.SIGNUP_BAD_USERNAME
			});
		}
		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			// bad password
			return fail(400, {
				message: 'Invalid password',
				type: ErrorTypes.SIGNUP_BAD_PASSWORD
			});
		}

		const hashedPassword = await Bun.password.hash(password);

		const usernameTaken = await prisma.user.findFirst({
			where: {
				username: username
			}
		});

		if (usernameTaken) {
			return fail(400, {
				message: 'Username already taken',
				type: ErrorTypes.SIGNUP_USERNAME_TAKEN
			});
		}
		const new_user = await prisma.user.create({
			data: {
				username: username,
				hashed_password: hashedPassword,
				isVerified: true
			}
		});

		console.log(new_user);

		const session = await lucia.createSession(new_user.id, {});
		// const sessionCookie = lucia.createSessionCookie(session.id);
		// event.cookies.set(sessionCookie.name, sessionCookie.value, {
		// 	path: '.',
		// 	...sessionCookie.attributes
		// });

		redirect(302, '/');
	}
};
