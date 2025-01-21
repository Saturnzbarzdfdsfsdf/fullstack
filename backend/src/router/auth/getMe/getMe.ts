import _ from 'lodash'
import { trpc } from '../../../lib/trpc'
import { toClientMe } from '../../../lib/models'

// что бы клиенту в браузер не пробросился пароль берем только нужные нам поля
const getMeTrpcRoute = trpc.procedure.query(({ ctx }) => {
	return { me: toClientMe(ctx.me) }
})

export default getMeTrpcRoute