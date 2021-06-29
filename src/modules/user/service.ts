import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from './entity';

@Service<Service_User>({ global: true })
export class Service_User {
	// ============================================================
	// 			CONSTRUCTOR
	// ============================================================
	constructor() {
		console.log(`NEW SERVICE:USER`);
	}
	// ============================================================
	// 			DEPENDENCIES
	// ============================================================
	@InjectRepository(User) private readonly userRepo: Repository<User>;
	count: number = 0;

	// ============================================================
	// 			METHODS
	// ============================================================
	async getUsers() {
		const [users, count] = await this.userRepo.findAndCount();
		this.count = count;
		return users;
	}

	async addUser() {
		const newUser = this.userRepo.create({ username: `User${this.count + 1}` });
		return await this.userRepo.save(newUser);
	}
}
