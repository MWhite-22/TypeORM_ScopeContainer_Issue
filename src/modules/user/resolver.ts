import { Mutation, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { User } from './entity';
import { Service_User } from './service';

@Resolver(() => User)
@Service<Resolver_User_CRUD>()
export class Resolver_User_CRUD {
	// ============================================================
	// 			CONSTRUCTOR
	// ============================================================
	constructor() {
		console.log(`NEW RESOLVER:USER_CRUD`);
	}

	// ============================================================
	// 			DEPENDENCIES
	// ============================================================
	@Inject() userService: Service_User;

	// ============================================================
	// 			GET ONE
	// ============================================================
	@Query(() => [User])
	getUsers() {
		return this.userService.getUsers();
	}

	// ============================================================
	// 			ADD ONE
	// ============================================================
	@Mutation(() => User)
	addUser() {
		return this.userService.addUser();
	}
}
