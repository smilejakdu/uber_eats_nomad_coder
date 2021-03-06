import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
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
	async createRestaurant(@Args('input') createRestaurantDto: CreateRestaurantDto): Promise<boolean> {
		console.log(createRestaurantDto);
		try {
			await this.restaurantService.createRestaurant(createRestaurantDto);
			return true;
		} catch (e) {
			console.log(e);
			return false;
		}
	}

	@Mutation(returns => Boolean)
	async updateRestaurant(@Args('input') updateRestaurantDto: UpdateRestaurantDto): Promise<boolean> {
		try {
			await this.restaurantService.updateRestaurant(updateRestaurantDto);
			return true;
		} catch (e) {
			console.log(e);
			return false;
		}
	}
}
