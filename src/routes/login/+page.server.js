import { PrismaClient, UserPodType } from '@prisma/client';

const prisma = new PrismaClient();

/** @type {import('./$types').Actions} */
export const actions = {
	login: async (event) => {}
};
