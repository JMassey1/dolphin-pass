import prisma from '$lib/prisma';
import { lucia } from '$lib/server/auth';
import ErrorTypes from '$lib/utils/errorTypes';
import { fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import type { Actions } from './$types';

export const actions: Actions = {
	signup: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirmPassword');

		if (password !== confirmPassword) {
			return fail(400, {
				message: 'Passwords do not match',
				type: ErrorTypes.SIGNUP_PASSWORDS_DO_NOT_MATCH
			});
		}

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

		const userId = generateId(15);
		if (usernameTaken) {
			return fail(400, {
				message: 'Username already taken',
				type: ErrorTypes.SIGNUP_USERNAME_TAKEN
			});
		}
		await prisma.user.create({
			data: {
				id: userId,
				username: username,
				hashed_password: hashedPassword,
				isVerified: true
			}
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
