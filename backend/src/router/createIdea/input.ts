import { z } from 'zod'

export const zCreateIdeaTrpcInput = z.object({
	name: z.string().min(1),
	nick: z.string().min(1).regex(/^[a-zA-Z0-9-]+$/, 'Nick does not valid'),
	description: z.string().min(1).trim(),
	text: z.string().min(5, 'Text should be at least 5 characters long'),
})
