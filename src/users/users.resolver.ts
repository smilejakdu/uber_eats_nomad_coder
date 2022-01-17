import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CreateAccountInput, CreateAccountOutput } from './dto/create-account.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(of => UserEntity)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(returns => Boolean)
	hi() {
		return true;
	}

	@Mutation(returns => CreateAccountOutput)
	async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
		try {
			const { ok, error } = await this.userService.createAccount(createAccountInput);
			return {
				ok,
				error,
			};
		} catch (error) {
			return {
				error,
				ok: false,
			};
		}
	}

	@Mutation(returns => LoginOutput)
	async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
		try {
			const { ok, error, token } = await this.userService.login(loginInput);
			return { ok, error, token };
		} catch (error) {
			return {
				ok: false,
				error,
			};
		}
	}

	@Query(returns => UserEntity)
	@UseGuards(AuthGuard)
	me() {}
}
