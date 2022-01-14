import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateAccountInput, CreateAccountOutput } from './dto/create-account.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './users.service';

@Resolver(of => UserEntity)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(returns => Boolean)
	hi() {
		return true;
	}

	@Mutation(returns => CreateAccountOutput)
	async createAccount(@Args('input') createAccountInput: CreateAccountInput) {
		try {
			const error = await this.userService.createAccount(createAccountInput);
			if (error) {
				return {
					ok: false,
					error,
				};
			}
			return {
				ok: true,
			};
		} catch (error) {
			return {
				error,
				ok: false,
			};
		}
	}
}
