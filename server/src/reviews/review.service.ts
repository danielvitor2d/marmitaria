import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Meal } from 'src/meal/interfaces/meal';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './interfaces/review';

@Injectable()
export class ReviewsService {
  constructor(
    @Inject('REVIEW_MODEL')
    private reviewModel: Model<Review>,
    @Inject('MEAL_MODEL')
    private mealModel: Model<Meal>,
  ) {}

  async create(dto: CreateReviewDto) {
    const created = new this.reviewModel({
      cntStar: dto.cntStar,
      comments: dto.comments,
      meal: dto.mealId,
    });
    const saved = await created.save();

    const meal = await this.mealModel.findById(dto.mealId).populate('reviews');
    const reviews = [...meal.reviews, created];

    await meal.updateOne({
      reviews,
    });

    return saved;
  }

  async findAll() {
    return this.reviewModel.find().populate('meal').exec();
  }

  async findByMeal(id: string) {
    return this.reviewModel
      .find({
        meal: id,
      })
      .exec();
  }
}
