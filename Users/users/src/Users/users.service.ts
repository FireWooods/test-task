import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async updateUsers() {
    const users = await this.userRepository.update(
      { problems: false },
      {
        where: {
          problems: true,
        },
      },
    );

    return users;
  }

  async createFakeUser() {
    const arrFakeUsers = [];
    const arrAllFakeUsers = [];
    for (let i = 0; i < 1000; i++) {
      const fakeUser = {
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        age: faker.number.int({ min: 10, max: 60 }),
        gender: faker.person.sex(),
        problems: faker.datatype.boolean(),
      };

      arrFakeUsers.push(fakeUser);
    }

    for (let i = 0; i < 1000; i++) {
      {
        const copyFakeUserArr = arrFakeUsers.map((element) => element);
        arrAllFakeUsers.push(copyFakeUserArr);
      }
    }

    for (let i = 0; i < arrAllFakeUsers.length; i++) {
      await this.userRepository.bulkCreate(arrAllFakeUsers[0]);
    }

    return { success: true };
  }
}
