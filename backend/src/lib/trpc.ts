import { initTRPC, type inferAsyncReturnType } from '@trpc/server'
import superjson from 'superjson'

import * as trpcExpress from '@trpc/server/adapters/express'
import { type Express } from 'express'
import { type TrpcRouter } from '../router'
import { type AppContext } from './ctx'
import { type ExpressRequest } from '../utils/types'

const getCreateTrpcContext =
	(appContext: AppContext) =>
	({ req }: trpcExpress.CreateExpressContextOptions) => ({
		...appContext,
		me: (req as ExpressRequest).user || null,
	})

type TrpcContext = inferAsyncReturnType<ReturnType<typeof getCreateTrpcContext>>


export const trpc = initTRPC.context<TrpcContext>().create({
	transformer: superjson,
})

export const applyTrpcToExpressApp = (
	expressApp: Express,
	appContext: AppContext,
	trpcRouter: TrpcRouter,
) => {
	expressApp.use(
		'/trpc',
		trpcExpress.createExpressMiddleware({
			router: trpcRouter,
			createContext: getCreateTrpcContext(appContext),
		})
	)
}
