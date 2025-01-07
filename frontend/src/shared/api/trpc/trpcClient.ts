import Cookies from 'js-cookie'
import superjson from 'superjson'
import { httpBatchLink } from '@trpc/client'

import { trpc } from './trpcReact'

export const trpcClient = trpc.createClient({
	transformer: superjson,
	links: [
		httpBatchLink({
			url: 'http://localhost:3000/trpc',
			
			headers: () => {
				const token = Cookies.get('token')
				
				return {
					...(token && { authorization: `Bearer ${token}` }),
				}

			},
		}),
	],
})
