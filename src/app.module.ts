import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RestaurantsModule } from './restaurants/restaurants.module';
import ormconfig from 'ormconfig';
import * as Joi from 'joi';
import { validate } from '../env.validation';

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
// DB_HOST = localhost;
console.log('DB_HOST:', process.env.DB_HOST);
@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: true,
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
			ignoreEnvFile: process.env.NODE_ENV === 'prod',
			validationSchema: Joi.object({
				NODE_ENV: Joi.string().valid('dev', 'prod').required(),
				DB_HOST: Joi.string().required(),
				DB_PORT: Joi.string().required(),
				DB_USERNAME: Joi.string().required(),
				DB_PASSWORD: Joi.string().required(),
				DB_NAME: Joi.string().required(),
			}),
		}),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT) as number,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			synchronize: true,
			logging: true,
		}),
		RestaurantsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
