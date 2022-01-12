import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateAccountInput } from './dto/create-account.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './users.service';

@Resolver(of => UserEntity)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(returns => Boolean)
	hi() {
		return true;
	}

	@Mutation(returns => UserEntity)
	createAccount(@Args('input') createAccountInput: CreateAccountInput) {}
}
