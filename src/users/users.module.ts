import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './users.service';
import { UserResolver } from './users.resolver';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	providers: [UserResolver, UserService],
	exports: [UserService],
})
export class UsersModule {}
