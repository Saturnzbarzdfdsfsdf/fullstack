import { httpBatchLink } from '@trpc/client'
import superjson from 'superjson'
import { trpc } from './trpcReact'

export const trpcClient = trpc.createClient({
	transformer: superjson,
	links: [
		httpBatchLink({
			url: 'http://localhost:3000/trpc',
		}),
	],
})
