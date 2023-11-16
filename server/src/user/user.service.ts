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

  async get(id: string) {
    const user = await this.userModel.findOne({
      _id: id,
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const response = await this.userModel.updateOne(
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

    if (!response.modifiedCount) {
      return {
        updated: false,
        user: null,
      };
    }

    const { name, lastName, email, address } = await this.get(id);

    return {
      updated: true,
      user: {
        id,
        name,
        lastName,
        email,
        address,
      },
    };
  }

  async addFavorite(id: string, rest_id: string) {
    const user = await this.get(id);

    if (!user) return false;
    user.favorites.push(rest_id);

    return user.save();
  }

  async rmvFavorite(id: string, rest_id: string) {
    const user = await this.get(id);

    if (!user) return false;
    user.favorites = user.favorites.filter((fav) => fav.toString() !== rest_id);

    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async checkLogin({ email, pwd }: LoginPayload) {
    const response = await this.userModel.findOne({ email }).exec();
    if (!response || !bcrypt.compareSync(pwd, response.pwd)) {
      return {
        logged: false,
        user: null,
      };
    }

    const { name, lastName, address, type, favorites, _id: id } = response;

    return {
      logged: true,
      user: {
        id,
        email,
        name,
        lastName,
        address,
        type,
        favorites,
      },
    };
  }
}
