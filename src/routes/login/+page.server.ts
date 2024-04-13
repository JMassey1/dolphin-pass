import prisma from '$lib/prisma';
import { lucia } from '$lib/server/auth';
import ErrorTypes from '$lib/utils/errorTypes';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.isLoggedIn) {
		redirect(302, '/');
	}
};

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		// Exists for type narrowing for username and password
		if (
			typeof username !== 'string' ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username) ||
			typeof password !== 'string' ||
			password.length < 2 ||
			password.length > 255
		) {
			return fail(400, {
				message: 'Invalid Credentials',
				type: ErrorTypes.LOGIN_BAD_CREDENTIALS
			});
		}

		const existingUser = await prisma.user.findUnique({ where: { username } });
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
		} else {
			existingUser.lastLoggedIn = new Date();
			await prisma.user.update({
				where: { id: existingUser.id },
				data: { lastLoggedIn: existingUser.lastLoggedIn }
			});
		}

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

		redirect(302, '/pods');
	},
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(302, '/login');
	}
};
