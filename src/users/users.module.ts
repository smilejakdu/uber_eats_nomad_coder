import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './users.service';
import { UserResolver } from './users.resolver';
import { ConfigService } from '@nestjs/config';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity]), ConfigService],
	providers: [UserResolver, UserService],
})
export class UsersModule {}
