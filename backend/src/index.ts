import express from 'express'

import * as trpcExpress from '@trpc/server/adapters/express'
import trpcRouter from './trpc' // Импорт маршрутизатора TRPC

import cors from 'cors'

const expressApp = express()

// Middleware CORS
expressApp.use(cors())

// Пинг для проверки работоспособности сервера
expressApp.get('/ping', (req, res) => {
	res.send('pong')
})

// Интеграция TRPC с Express
expressApp.use(
	'/trpc',
	trpcExpress.createExpressMiddleware({
		router: trpcRouter,
		createContext: () => ({}), // Настройка контекста (если нужно)
	})
)

// Запуск сервера
const PORT = process.env.PORT || 3000

expressApp.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
