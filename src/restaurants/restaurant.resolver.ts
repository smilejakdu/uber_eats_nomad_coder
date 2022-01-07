import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantEntity } from './entities/restaurant.entity';
import { RestaurantService } from './restaurant.service';

@Resolver(of => RestaurantEntity)
export class RestaurantResolver {
	constructor(private readonly restaurantService: RestaurantService) {}
	@Query(returns => [RestaurantEntity])
	restaurants(): Promise<RestaurantEntity[]> {
		return this.restaurantService.getAll();
	}
	@Mutation(returns => Boolean)
	createRestaurant(@Args() createRestaurantDto: CreateRestaurantDto): boolean {
		return true;
	}
}
