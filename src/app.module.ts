import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RestaurantsModule } from './restaurants/restaurants.module';
import ormconfig from 'ormconfig';

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: true,
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
		}),
		TypeOrmModule.forRoot(ormconfig),
		RestaurantsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
