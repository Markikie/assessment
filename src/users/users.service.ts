import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];

  findAll() {
    return this.users;
  }

  create(user: CreateUserDto) {
    const newUser = { id: Date.now(), ...user };
    this.users.push(newUser);
    return newUser;
  }
}
