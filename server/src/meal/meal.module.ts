import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { MealController } from './meal.controller';
import { mealsProviders } from './meal.providers';
import { MealsService } from './meal.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MealController],
  providers: [MealsService, ...mealsProviders],
})
export class MealsModule {}
