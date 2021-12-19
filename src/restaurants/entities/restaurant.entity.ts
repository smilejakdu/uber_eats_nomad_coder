import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@InputType('RestaurantInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant {
	@Field(() => String)
	name: string;

	@Field(type => Boolean, { nullable: true })
	isVegan?: boolean;

	@Field(type => String)
	address?: string;

	@Field(type => String)
	ownersName?: string;
}
