import type { ApolloServerPlugin } from 'apollo-server-plugin-base';

export const ResponseTimer: ApolloServerPlugin<CTX> = {
	requestDidStart: ({ context, request }) => {
		if (request.operationName === 'IntrospectionQuery') return;

		console.log(`\n----------| Request Started: ${context.requestId} | ${request.operationName} |----------`);

		// Logger.info(`Request Start: ${context.requestId} - ${request.operationName}`);
		const startTime = new Date().getTime();

		return {
			willSendResponse: ({ context }) => {
				const endTime = new Date().getTime();
				const totalRequestTime = endTime - startTime;
				// Logger.info(`Request End: ${context.requestId} - ${totalRequestTime}ms`);

				console.log(`----------| Request End: ${context.requestId} | ${totalRequestTime}ms |----------\n`);
			},
		};
	},
};
