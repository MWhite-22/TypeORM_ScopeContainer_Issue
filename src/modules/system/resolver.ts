import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';

@Resolver()
@Service<Resolver_System>()
export class Resolver_System {
	// ============================================================
	// 			CONSTRUCTOR
	// ============================================================
	constructor(@Inject('CTX') private context: CTX) {
		console.log(`NEW RESOLVER:SYSTEM - ${this.context.requestId}`);
	}

	// ============================================================
	// 			METHODS
	// ============================================================
	@Query(() => String)
	_hello() {
		return `Hello World`;
	}

	@Mutation(() => Boolean)
	_wait(@Arg('wait', { nullable: true }) ms: number = 5000) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, ms);
		});
	}
}
