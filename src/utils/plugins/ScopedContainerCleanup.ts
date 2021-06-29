import type { ApolloServerPlugin } from 'apollo-server-plugin-base';
import Container, { ContainerInstance } from 'typedi';

export const ScopedContainerCleanup: ApolloServerPlugin<CTX> = {
	requestDidStart: ({ request }) => {
		const introspectReq = request.operationName === 'IntrospectionQuery';

		return {
			willSendResponse({ context }) {
				//Dispose the scoped container to prevent memory leaks
				Container.reset(context.requestId);

				if (!introspectReq) {
					//Log of scoped container instances still in memory
					const instancesIds = ((Container as any).instances as ContainerInstance[]).map(
						(instance) => instance.id
					);
					console.log('Instances left in memory:', instancesIds);
				}
			},
		};
	},
};
