import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MealsModule } from './meal/meal.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [UsersModule, MealsModule, RestaurantModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
