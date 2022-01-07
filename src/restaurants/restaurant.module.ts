import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './entities/restaurant.entity';
import { RestaurantResolver } from './restaurant.resolver';
import { RestaurantService } from './restaurant.service';

@Module({
	imports: [TypeOrmModule.forFeature([RestaurantEntity])],
	providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantsModule {}
