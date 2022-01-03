import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/CoreEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'restaurant' })
export class RestaurantEntity extends CoreEntity {
	@PrimaryGeneratedColumn()
	@Field(type => Number)
	id: number;

	@Field(type => String)
	name: string;

	@Field(type => Boolean)
	@Column()
	isVegan: boolean;

	@Field(type => String)
	@Column()
	address: string;

	@Field(type => String)
	@Column()
	ownersName: string;

	@Field(type => String)
	@Column()
	categoryName: string;
}
