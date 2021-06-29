import cuid from 'cuid';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
	// ============================================================
	// 			PROPERTIES
	// ============================================================
	@Field(() => ID)
	@PrimaryColumn()
	id: string = cuid();

	@Field()
	@Column()
	username: string;

	@Column()
	password: string = 'password';
}

@InputType()
export class Input_User_Create implements Partial<User> {
	@Field()
	username: string;
}
