import { trpc } from '../lib/trpc'

import { getIdeaTrpcRoute } from './getIdea/getIdea'
import { getIdeasTrpcRoute } from './getIdeas/getIdeas'

export const trpcRouter = trpc.router({
	getIdea: getIdeaTrpcRoute,
	getIdeas: getIdeasTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
