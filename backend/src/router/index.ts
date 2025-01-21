import { trpc } from '../lib/trpc'

import { 
	getMeTrpcRoute,
	signUpTrpcRoute,
	signInTrpcRoute 
} from './auth/index'

import {
	getIdeaTrpcRoute,
	getIdeasTrpcRoute,
	createIdeaTrpcRoute,
	updateIdeaTrpcRoute,
} from './idea/index'

import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'

export const trpcRouter = trpc.router({
	getIdea: getIdeaTrpcRoute,
	getIdeas: getIdeasTrpcRoute,
	createIdea: createIdeaTrpcRoute,
	getMe: getMeTrpcRoute,
	signIn: signInTrpcRoute,
	signUp: signUpTrpcRoute,
	updateIdea: updateIdeaTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
