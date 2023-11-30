import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';

import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './review.service';

@Controller({ path: 'reviews', version: '1.0' })
export class ReviewController {
  private readonly logger: Logger = new Logger();

  constructor(private readonly service: ReviewsService) {}

  @Post()
  async create(@Body() dto: CreateReviewDto) {
    // console.log(dto);
    try {
      const response = await this.service.create(dto);
      return {
        registered: response !== undefined,
        review: {
          id: response._id,
          cntStar: response.cntStar,
          comments: response.comments,
          meal: response.meal,
        },
      };
    } catch (error) {
      this.logger.error(`could not create a new review due to error: ${error}`);
      return {
        registered: null,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      return this.service.findAll();
    } catch (error) {
      this.logger.error(`could not find all reviews due to error: ${error}`);
    }
  }

  @Get('/meal/:id')
  async findByMeal(@Param('id') id: string) {
    try {
      return this.service.findByMeal(id);
    } catch (error) {
      this.logger.error(`could not find all reviews due to error: ${error}`);
    }
  }
}
