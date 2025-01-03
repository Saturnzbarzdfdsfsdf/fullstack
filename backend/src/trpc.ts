import { initTRPC } from '@trpc/server'

import _ from 'lodash'
import { z } from 'zod'

// Инициализация TRPC
const t = initTRPC.create()
const trpc = t.router

// Генерация массива идей
const ideas = _.times(100, i => ({
	nick: `cool-idea-nick-${i}`,
	name: `Idea ${i}`,
	description: `Description of idea ${i}...`,
	text: _.times(100, j => `<p>Text paragraph ${j} of idea ${i}...</p>`).join(''),
}))

// Определение маршрутов
const trpcRouter = trpc({
	getIdeas: t.procedure.query(() => {
		return {
			ideas: ideas.map(idea => _.pick(idea, ['nick', 'name', 'description'])),
		}
	}),
	getIdea: t.procedure
		.input(
			z.object({
				ideaNick: z.string(),
			})
		)
		.query(({ input }) => {
			const idea = ideas.find(idea => idea.nick === input.ideaNick)
			return { idea: idea || null }
		}),
})

export type TrpcRouter = typeof trpcRouter
export default trpcRouter
