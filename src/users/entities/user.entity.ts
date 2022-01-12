import { Column, Entity } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreEntity } from 'src/common/entities/CoreEntity';

enum UserRole {
	Client,
	Owner,
	Delivery,
}

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class UserEntity extends CoreEntity {
	@Column()
	@Field(type => String)
	email: string;

	@Column()
	@Field(type => String)
	password: string;

	@Column({ type: 'enum', enum: UserRole })
	@Field(type => UserRole)
	role: UserRole;
}
