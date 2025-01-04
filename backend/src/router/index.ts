import { trpc } from '../lib/trpc'

import { getIdeaTrpcRoute } from './getIdea/getIdea'
import { getIdeasTrpcRoute } from './getIdeas/getIdeas'
import { createIdeaTrpcRoute } from './createIdea/createIdea'

export const trpcRouter = trpc.router({
	getIdea: getIdeaTrpcRoute,
	getIdeas: getIdeasTrpcRoute,
	createIdea: createIdeaTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter


