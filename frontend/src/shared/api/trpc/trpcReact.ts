import { createTRPCReact } from '@trpc/react-query'

import type { TrpcRouter } from '@full-app/backend/src/router'

export const trpc = createTRPCReact<TrpcRouter>()
