import { RestaurantEntity } from 'src/restaurants/entities/restaurant.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

console.log('process.env.DB_HOST:', process.env.DB_HOST);
const config: TypeOrmModuleOptions = {
	type: 'mysql',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT) as number,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: [RestaurantEntity], // 사용할 entity
	migrations: [__dirname + '/src/migrations/*.ts'],
	cli: { migrationsDir: 'src/migrations' },
	autoLoadEntities: true,
	charset: 'utf8mb4',
	synchronize: true, // 한번 만들고 나서는 false 로 해야함
	logging: true, // typescript 작성하게 될때 orm 이 자동으로 sql 로 바꿔주게된다. 이게 비효율적으로 될 수도 있다. 그래서
	keepConnectionAlive: true,
};

export = config;
