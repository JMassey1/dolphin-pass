import { dev } from '$app/environment';
import prisma from '$lib/prisma';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import type { User as PrismaUser } from '@prisma/client';
import { Lucia } from 'lucia';

const adapter = new PrismaAdapter(prisma.session, prisma.user); // your adapter

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			username: attributes.username,
			isVerified: attributes.isVerified,
			lastLoggedIn: attributes.lastLoggedIn
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes extends PrismaUser {}
