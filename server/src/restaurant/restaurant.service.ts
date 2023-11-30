import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Meal } from 'src/meal/interfaces/meal';
import { CreateRestDto } from './dto/create-rest.dto';
import { UpdateRestDto } from './dto/update-rest.dto';
import { Restaurant } from './interfaces/restaurant';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject('RESTAURANT_MODEL')
    private restaurantModel: Model<Restaurant>,
    @Inject('MEAL_MODEL')
    private mealModel: Model<Meal>,
  ) {}

  async create(createRestDto: CreateRestDto) {
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

    const { name, address, value, paymentforms, isSuggestion } = await this.get(
      id,
    );

    return {
      updated: true,
      rest: {
        id,
        name,
        address,
        value,
        paymentforms,
        isSuggestion,
      },
    };
  }

  async findAll() {
    return this.restaurantModel
      .find()
      .populate({
        path: 'meals',
        populate: 'reviews',
      })
      .exec();
  }

  async delete(id: string) {
    const rest = await this.get(id);

    await Promise.all(
      rest.meals.map(async (meal) => {
        await this.mealModel.findByIdAndDelete(meal);
      }),
    );

    return this.restaurantModel.findByIdAndDelete(id);
  }
}
