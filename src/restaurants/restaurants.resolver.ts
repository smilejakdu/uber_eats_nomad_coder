import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';

@Resolver()
export class RestaurantResolver {
	@Query(() => [Restaurant])
	restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
		console.log(veganOnly);
		return [];
	}

	@Mutation(() => Boolean)
	createRestaurant(@Args('createRestaurantDto') createRestaurantDto: string): Boolean {
		console.log(createRestaurantDto);
		return true;
	}
}
