import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantEntity } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
	constructor(
		@InjectRepository(RestaurantEntity)
		private readonly restaurants: Repository<RestaurantEntity>,
	) {}
	getAll(): Promise<RestaurantEntity[]> {
		return this.restaurants.find();
	}
	createRestaurant(createRestaurantDto: CreateRestaurantDto): Promise<RestaurantEntity> {
		const newRestaurant = this.restaurants.create(createRestaurantDto);
		return this.restaurants.save(newRestaurant);
	}
	updateRestaurant({ id, data }: UpdateRestaurantDto) {
		return this.restaurants.update(id, { ...data });
	}
}
