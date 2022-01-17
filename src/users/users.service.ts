import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import { CreateAccountInput } from './dto/create-account.dto';
import { UserEntity } from './entities/user.entity';
import { LoginInput } from './dto/login.dto';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {}

	async createAccount({ email, password, role }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
		try {
			const exists = await this.usersRepository.findOne({ email });
			if (exists) {
				return { ok: false, error: 'There is a user with that email already' };
			}
			await this.usersRepository.save(this.usersRepository.create({ email, password, role }));
			return {
				ok: true,
			};
		} catch (error) {
			return { ok: false, error: "Couldn't create account" };
		}
	}

	async login({ email, password }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
		try {
			const responseUser = await this.usersRepository.findOne({ email });
			if (!responseUser) {
				return {
					ok: false,
					error: 'User not found',
				};
			}
			const passwordCorrect = await responseUser.checkPassword(password);
			if (!passwordCorrect) {
				return {
					ok: false,
					error: 'Wrong password',
				};
			}
			const token = await this.jwtService.sign(responseUser.id);
			return {
				ok: true,
				token,
			};
		} catch (error) {
			return {
				ok: false,
				error,
			};
		}
	}

	async findById(id: number): Promise<UserEntity> {
		return this.usersRepository.findOne({ id });
	}
}
