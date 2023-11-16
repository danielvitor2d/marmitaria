import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { MealsService } from './meal.service';

@Controller({ path: 'meals', version: '1.0' })
export class MealController {
  private readonly logger: Logger = new Logger();

  constructor(private readonly mealsService: MealsService) {}

  @Post()
  async create(@Body() createMealDto: CreateMealDto) {
    try {
      const response = await this.mealsService.create(createMealDto);
      return {
        registered: response !== undefined,
      };
    } catch (error) {
      this.logger.error(`could not create a new meal due to error: ${error}`);
      return {
        registered: null,
      };
    }
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateMeal: UpdateMealDto) {
    try {
      return this.mealsService.update(id, updateMeal);
    } catch (error) {
      this.logger.error(`could not update meal due to error: ${error}`);
      return {
        updated: false,
        meal: null,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      return this.mealsService.findAll();
    } catch (error) {
      this.logger.error(`could not find all meals due to error: ${error}`);
    }
  }
}
