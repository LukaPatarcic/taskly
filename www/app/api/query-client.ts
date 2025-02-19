// React Query
import {
	MutationCache,
	QueryCache,
	QueryClient,
	isServer,
} from '@tanstack/react-query';

function makeQueryClient() {
	return new QueryClient({
		queryCache: new QueryCache({
			onError: (err) => {
			},
		}),
		mutationCache: new MutationCache({
			onError: () => {
			},
		}),
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
	if (isServer) {
		return makeQueryClient();
	} else {
		if (!browserQueryClient) browserQueryClient = makeQueryClient();

		return browserQueryClient;
	}
}
