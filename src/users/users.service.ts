import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bycrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersrepo: Repository<User>) {}
  async create(username: string, password: string): Promise<User> {
    const password_hash = await bycrypt.hash(password, 10);
    const user = this.usersrepo.create({ username, password: password_hash });
    return this.usersrepo.save(user);
  }
  async findByUsername(username: string): Promise<User | null> {
    return this.usersrepo.findOne({ where: { username } });
  }
  async findAll(): Promise<User[]> {
    return this.usersrepo.find();
  }
}
