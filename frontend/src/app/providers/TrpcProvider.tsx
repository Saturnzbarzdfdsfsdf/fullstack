import { QueryClientProvider } from '@tanstack/react-query'
import { trpcClient, trpc } from '../../shared/api/trpc/index'
import { queryClient } from '../../shared/api/trpc/queryClient'

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	)
}
