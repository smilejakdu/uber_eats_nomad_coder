import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dto/create-account.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
	constructor(@InjectRepository(UserEntity) private readonly users: Repository<UserEntity>) {}

	async createAccount({ email, password, role }: CreateAccountInput) {
		try {
			const exists = await this.users.findOne({ email });
			if (exists) {
				// make error
				return;
			}
			await this.users.save(this.users.create({ email, password, role }));
			return true;
		} catch (e) {
			//make error
			return;
		}
	}
}
