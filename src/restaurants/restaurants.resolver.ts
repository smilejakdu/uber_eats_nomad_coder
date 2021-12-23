import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantEntity } from './entities/restaurant.entity';

@Resolver(of => RestaurantEntity)
export class RestaurantResolver {
	@Query(returns => [RestaurantEntity])
	restaurants(@Args('veganOnly') veganOnly: boolean): RestaurantEntity[] {
		return [];
	}
	@Mutation(returns => Boolean)
	createRestaurant(@Args() createRestaurantDto: CreateRestaurantDto): boolean {
		console.log(createRestaurantDto);
		return true;
	}
}
