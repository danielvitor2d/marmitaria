import { Module } from '@nestjs/common';

import { mealsProviders } from 'src/meal/meal.providers';
import { DatabaseModule } from '../database/database.module';
import { ReviewController } from './review.controller';
import { ReviewsService } from './review.service';
import { reviewsProviders } from './reviews.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ReviewController],
  providers: [ReviewsService, ...reviewsProviders, ...mealsProviders],
})
export class ReviewModule {}
