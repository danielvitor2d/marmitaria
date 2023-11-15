import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginPayload } from './interfaces/login';
import { User } from './interfaces/user';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.pwd = bcrypt.hashSync(createUserDto.pwd, 10);
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          id,
          ...updateUserDto,
        },
      },
    );
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async checkLogin({ email, pwd }: LoginPayload) {
    const res = await this.userModel.findOne({ email }).exec();
    console.log(`res: ${res}`);

    return res && bcrypt.compareSync(pwd, res.pwd);
  }
}
