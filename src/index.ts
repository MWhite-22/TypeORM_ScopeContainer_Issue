import 'reflect-metadata';
import 'dotenv-safe/config.js';
import 'module-alias/register';
import cuid from 'cuid';
import path from 'path';
import Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, ResolverData } from 'type-graphql';
import { createConnection, useContainer } from 'typeorm';
import { Container as TypeOrmContainer } from 'typeorm-typedi-extensions';
import { Container } from 'typedi';
import { ENV } from './constants';
import { ScopedContainerCleanup } from './utils/plugins/ScopedContainerCleanup';
import { ResponseTimer } from './utils/plugins/ResponseTimer';

useContainer(TypeOrmContainer);

async function main() {
	// ============================================================
	// 			SETUP
	// ============================================================
	const app = Express();

	// ============================================================
	// 			DB
	// ============================================================
	try {
		const DB = await createConnection({
			type: 'postgres',
			url: ENV.POSTGRES.URL,
			logging: true,
			synchronize: true,
			entities: [path.join(process.cwd(), 'build/modules/**/entity*.js')],
		});
		console.log('TypeORM Connected:', DB.isConnected);
	} catch (e) {
		console.warn('TypeORM Connection Error');
		console.log(e);
		process.exit(1);
	}

	// ============================================================
	// 			APOLLO SERVER
	// ============================================================
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [path.join(process.cwd(), 'build/modules/**/resolver*.js')],
			container: ({ context }: ResolverData<CTX>) => context.scopedContainer,
		}),
		context: ({ req, res }): CTX => {
			const requestId = cuid();
			const scopedContainer = Container.of(requestId);

			const context: CTX = {
				requestId,
				req,
				res,
				scopedContainer,
			};

			scopedContainer.set<CTX>('CTX', context);

			return context;
		},
		plugins: [ScopedContainerCleanup, ResponseTimer],
		playground: { settings: { 'request.credentials': 'include' } },
	});

	apolloServer.applyMiddleware({
		app,
		cors: { origin: ENV.FRONTEND.URL, credentials: true },
	});

	// ============================================================
	// 			START SERVER
	// ============================================================
	app.listen(ENV.PORT, () => console.log(`Server started on http://localhost:${ENV.PORT}/graphql`));
}

main().catch(async (error) => {
	console.error(error);
});
