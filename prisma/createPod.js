import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	// await prisma.pod.create({
	// 	data: {
	// 		name: 'jordan jod',
	// 		description: 'this is jordan jod',
	// 		users: {
	// 			connect: {
	// 				username: 'jordan'
	// 			}
	// 		}
	// 	}
	// });

	const res = await prisma.pod.findFirst({
		include: {
			users: true
		}
	});

	console.log(res);
}

main()
	// catch any erroes
	.catch((err) => {
		console.error('HERE IS THE ERROR YOU RETARDS');
		console.error(err);
	})
	// disconnect the prisma client once all processes are executed
	.finally(() => {
		console.log('closing prisma');
		prisma.$disconnect();
	});
