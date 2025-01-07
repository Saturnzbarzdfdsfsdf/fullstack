import cors from 'cors'
import express from 'express'

import { trpcRouter } from './router'
import { applyTrpcToExpressApp } from './lib/trpc'
import { applyPassportToExpressApp } from './lib/passport'

import { env } from './lib/env'

import { type AppContext, createAppContext } from './lib/ctx'

void (async () => {

	let ctx: AppContext | null = null
	
	try {
	
		 ctx = createAppContext()

		const expressApp = express()
		
		expressApp.use(cors())

		expressApp.get('/ping', (req, res) => {
			res.send('pong')
		})

		applyPassportToExpressApp(expressApp, ctx)
		applyTrpcToExpressApp(expressApp, ctx, trpcRouter)
		
		 expressApp.listen(env.PORT, () => {
			console.info(`Listening at http://localhost:${env.PORT}`)
		})

	} catch (error) {
		
		console.error(error)
		await ctx?.stop()
	}
})()
