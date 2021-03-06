import { InternalServerErrorException } from '@nestjs/common';
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/CoreEntity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsEnum } from 'class-validator';

enum UserRole {
	Client,
	Owner,
	Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class UserEntity extends CoreEntity {
	@Column()
	@Field(type => String)
	@IsEmail()
	email: string;

	@Column()
	@Field(type => String)
	password: string;

	@Column({ type: 'enum', enum: UserRole })
	@Field(type => UserRole)
	@IsEnum(UserRole)
	role: UserRole;

	@BeforeInsert()
	async hashPassword(): Promise<void> {
		try {
			this.password = await bcrypt.hash(this.password, 10);
		} catch (error) {
			console.log(error);
			throw new InternalServerErrorException();
		}
	}

	async checkPassword(aPassword: string): Promise<boolean> {
		try {
			const ok = await bcrypt.compare(aPassword, this.password);
			return ok;
		} catch (error) {
			console.log(error);
			throw new InternalServerErrorException();
		}
	}
}
