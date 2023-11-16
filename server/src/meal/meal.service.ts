import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Meal } from './interfaces/meal';

@Injectable()
export class MealsService {
  constructor(
    @Inject('MEAL_MODEL')
    private mealModel: Model<Meal>,
  ) {}

  async create(createMealDto: CreateMealDto): Promise<Meal> {
    const createdMeal = new this.mealModel(createMealDto);
    return createdMeal.save();
  }

  async get(id: string) {
    const meal = await this.mealModel.findOne({
      _id: id,
    });

    return meal;
  }

  async update(id: string, updateMealDto: UpdateMealDto) {
    const response = await this.mealModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          id,
          ...updateMealDto,
        },
      },
    );

    if (!response.modifiedCount) {
      return {
        updated: false,
        meal: null,
      };
    }

    const { name, desc, value } = await this.get(id);

    return {
      updated: true,
      meal: {
        id,
        name,
        desc,
        value,
      },
    };
  }

  async findAll(): Promise<Meal[]> {
    return this.mealModel.find().exec();
  }
}
