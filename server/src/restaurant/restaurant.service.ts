import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateRestDto } from './dto/create-rest.dto';
import { UpdateRestDto } from './dto/update-rest.dto';
import { Restaurant } from './interfaces/restaurant';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject('RESTAURANT_MODEL')
    private restaurantModel: Model<Restaurant>,
  ) {}

  async create(createRestDto: CreateRestDto): Promise<Restaurant> {
    const created = new this.restaurantModel(createRestDto);
    return created.save();
  }

  async get(id: string) {
    const rest = await this.restaurantModel.findOne({
      _id: id,
    });

    return rest;
  }

  async addMealToRest(id: string, mealId: string) {
    const rest = await this.get(id);

    if (!rest) return false;
    rest.meals.push(mealId);

    return rest.save();
  }

  async update(id: string, updateRestDto: UpdateRestDto) {
    const response = await this.restaurantModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          id,
          ...updateRestDto,
        },
      },
    );

    if (!response.modifiedCount) {
      return {
        updated: false,
        rest: null,
      };
    }

    const { name, address, value, paymentforms } = await this.get(id);

    return {
      updated: true,
      rest: {
        id,
        name,
        address,
        value,
        paymentforms,
      },
    };
  }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantModel.find().populate('meals').exec();
  }
}
