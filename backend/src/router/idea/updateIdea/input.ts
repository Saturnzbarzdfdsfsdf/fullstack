import { z } from 'zod'
import { zCreateIdeaTrpcInput } from '../../idea/createIdea/input'

export const zUpdateIdeaTrpcInput = zCreateIdeaTrpcInput.extend({
	ideaId: z.string().min(1),
})
