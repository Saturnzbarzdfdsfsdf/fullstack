import { trpc } from '../lib/trpc'

import { getIdeaTrpcRoute } from './getIdea/getIdea'
import { getIdeasTrpcRoute } from './getIdeas/getIdeas'
import { createIdeaTrpcRoute } from './createIdea/createIdea'
import { signUpTrpcRoute } from './signUp/signUp'
import { signInTrpcRoute } from './signIn/signIn'
import { getMeTrpcRoute } from './getMe/getMe'
import { updateIdeaTrpcRoute } from './updateIdea/updateIdea'


import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'

export const trpcRouter = trpc.router({
	getIdea: getIdeaTrpcRoute,
	getIdeas: getIdeasTrpcRoute,
	createIdea: createIdeaTrpcRoute,
	getMe: getMeTrpcRoute,
	signIn: signInTrpcRoute,
	signUp: signUpTrpcRoute,
	updateIdea: updateIdeaTrpcRoute

})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
