import Cookies from 'js-cookie'
import superjson from 'superjson'
import { httpBatchLink } from '@trpc/client'

import { env } from '../../config/env'
import { trpc } from './trpcReact'

export const trpcClient = trpc.createClient({
	transformer: superjson,
	links: [
		httpBatchLink({
			url: env.VITE_BACKEND_TRPC_URL,
			
			headers: () => {
				const token = Cookies.get('token')
				
				return {
					...(token && { authorization: `Bearer ${token}` }),
				}

			},
		}),
	],
})
