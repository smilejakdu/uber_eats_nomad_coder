import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dto/create-account.dto';
import { UserEntity } from './entities/user.entity';

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
}
