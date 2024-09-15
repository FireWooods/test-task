import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getFakeUser() {
    let i = 0;
    const fakeUsersArr = [];
    while (i < 1000000) {
      let fakeUser = {
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        age: faker.number.int({ min: 10, max: 60 }),
        gender: faker.person.sex(),
        problems: faker.datatype.boolean(),
      };
      fakeUsersArr.push(fakeUser);
      i++;
    }

    return fakeUsersArr;
  }
}
