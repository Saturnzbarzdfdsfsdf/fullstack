import { trpc } from '../lib/trpc'

import { getIdeaTrpcRoute } from './getIdea/getIdea'
import { getIdeasTrpcRoute } from './getIdeas/getIdeas'
import { createIdeaTrpcRoute } from './createIdea/createIdea'
import { signUpTrpcRoute } from './signUp/signUp'
import { signInTrpcRoute } from './signIn/signIn'
import { getMeTrpcRoute } from './getMe/getMe'

export const trpcRouter = trpc.router({
	getIdea: getIdeaTrpcRoute,
	getIdeas: getIdeasTrpcRoute,
	createIdea: createIdeaTrpcRoute,
	getMe: getMeTrpcRoute,
	signIn: signInTrpcRoute,
	signUp: signUpTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter

