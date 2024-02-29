import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const {
      email,
      password,
      username,
      phoneNumber,
      citizenId,
      country,
      passportNumber,
      proofOfIdentity,
    } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      email,
      username: username,
      password: hashedPassword,
      phoneNumber,
      citizenId,
      country,
      passportNumber,
      proofOfIdentity,
    });

    // console.log('user', user);

    try {
      await this.save(user);
    } catch (error) {
      console.log('error', error);
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
