import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dto/create-account.dto';
import { UserEntity } from './entities/user.entity';
import { LoginInput } from './dto/login.dto';

@Injectable()
export class UserService {
	constructor(@InjectRepository(UserEntity) private readonly users: Repository<UserEntity>) {}

	async createAccount({ email, password, role }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
		try {
			const exists = await this.users.findOne({ email });
			if (exists) {
				return { ok: false, error: 'There is a user with that email already' };
			}
			await this.users.save(this.users.create({ email, password, role }));
			return {
				ok: true,
			};
		} catch (error) {
			return { ok: false, error: "Couldn't create account" };
		}
	}

	async login({ email, password }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
		// make a JWT give it to the user
		try {
			const user = await this.users.findOne({ email });
			if (!user) {
				return {
					ok: false,
					error: 'Wrong password',
				};
			}
			const passwordCorrect = await user.checkPassword(password);
			if (!passwordCorrect) {
				return {
					ok: false,
					error: 'Wrong password',
				};
			}
			return {
				ok: true,
				token: 'lalalalalala',
			};
		} catch (error) {
			return {
				ok: false,
				error,
			};
		}
	}
}
