import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { restaurantProviders } from './restaurant.providers';
import { mealsProviders } from 'src/meal/meal.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RestaurantController],
  providers: [RestaurantService, ...restaurantProviders, ...mealsProviders],
})
export class RestaurantModule {}
