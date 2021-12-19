import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity } from 'typeorm';

@ObjectType()
@Entity({ name: 'restaurant' })
export class RestaurantEntity extends CoreEntity {
	@Field(type => String)
	name: string;

	@Field(type => Boolean)
	isVegan: boolean;

	@Field(type => String)
	address: string;

	@Field(type => String)
	ownersName: string;
}
