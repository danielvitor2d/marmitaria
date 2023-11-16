import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { restaurantProviders } from './restaurant.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RestaurantController],
  providers: [RestaurantService, ...restaurantProviders],
})
export class RestaurantModule {}
