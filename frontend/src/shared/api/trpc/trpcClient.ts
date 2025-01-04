import { httpBatchLink } from '@trpc/client'
import { trpc } from './trpcReact'

export const trpcClient = trpc.createClient({
	links: [
		httpBatchLink({
			url: 'http://localhost:3000/trpc',
		}),
	],
})
