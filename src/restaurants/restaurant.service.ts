import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantEntity } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
	constructor(
		@InjectRepository(RestaurantEntity)
		private readonly restaurantRepository: Repository<RestaurantEntity>,
	) {}

	async getAll(): Promise<RestaurantEntity[]> {
		return this.restaurantRepository.find();
	}

	async createRestaurant(createRestaurantDto: CreateRestaurantDto): Promise<RestaurantEntity> {
		const newRestaurant = this.restaurantRepository.create(createRestaurantDto);
		return await this.restaurantRepository.save(newRestaurant);
	}
}
