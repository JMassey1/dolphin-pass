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

		console.log(`username: ${username}, password: ${password}`);

		if (
			typeof username !== 'string' ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			return fail(400, {
				message: 'Invalid username',
				type: ErrorTypes.SIGNUP_BAD_USERNAME
			});
		}
		if (typeof password !== 'string' || password.length < 2 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password',
				type: ErrorTypes.SIGNUP_BAD_PASSWORD
			});
		}

		const existingUser = await prisma.user.findUnique({ where: { username } });
		console.log(existingUser);
		if (!existingUser) {
			// NOTE:
			// Returning immediately allows malicious actors to figure out valid usernames from response times,
			// allowing them to only focus on guessing passwords in brute-force attacks.
			// As a preventive measure, you may want to hash passwords even for invalid usernames.
			// However, valid usernames can be already be revealed with the signup page among other methods.
			// It will also be much more resource intensive.
			// Since protecting against this is non-trivial,
			// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
			// If usernames are public, you may outright tell the user that the username is invalid.
			return fail(400, {
				message: 'Incorrect username or password',
				type: ErrorTypes.LOGIN_BAD_CREDENTIALS
			});
		}
		console.log(`hashed_password: ${existingUser.hashed_password}`);
		console.log(`password: ${password}`);
		let validPassword;
		try {
			validPassword = await Bun.password.verify(password, existingUser.hashed_password);
		} catch (error) {
			console.error(error);
			return fail(500, {
				message: 'Internal server error',
				type: ErrorTypes.INTERNAL_ERROR
			});
		}
		if (!validPassword) {
			return fail(400, {
				message: 'Incorrect username or password',
				type: ErrorTypes.LOGIN_BAD_CREDENTIALS
			});
		}

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
