import { PrismaClient } from '@prisma/client'

// Создание контекста приложения
export const createAppContext = () => {
	const prisma = new PrismaClient()

	return {
		prisma,
		stop: async () => {
			try {
				await prisma.$disconnect()
			} catch (error) {
				console.error('Error disconnecting Prisma client:', error)
			}
		},
	}
}

// Типизация контекста приложения
export type AppContext = ReturnType<typeof createAppContext>
