import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRestDto } from './dto/create-rest.dto';
import { UpdateRestDto } from './dto/update-rest.dto';
import { RestaurantService } from './restaurant.service';

@Controller({ path: 'restaurants', version: '1.0' })
export class RestaurantController {
  private readonly logger: Logger = new Logger();

  constructor(private readonly restService: RestaurantService) {}

  @Post()
  async create(@Body() createRest: CreateRestDto) {
    try {
      const response = await this.restService.create(createRest);
      return {
        registered: response !== null,
        rest: {
          id: response._id,
          name: response.name,
          address: response.address,
          value: response.value,
          paymentforms: response.paymentforms,
        },
      };
    } catch (error) {
      this.logger.error(`could not create a new rest due to error: ${error}`);
      return {
        registered: false,
        restaurant: null,
      };
    }
  }

  @Patch('/:id/meal/:meal_id')
  async addMealToRest(
    @Param('id') id: string,
    @Param('meal_id') meal_id: string,
  ) {
    try {
      const rest = await this.restService.addMealToRest(id, meal_id);
      if (!rest)
        return {
          added: false,
          rest: null,
        };
      return {
        added: true,
        rest: {
          id: rest._id,
          name: rest.name,
          address: rest.address,
          value: rest.value,
          paymentforms: rest.paymentforms,
          meals: rest.meals,
        },
      };
    } catch (error) {
      this.logger.error(`could not update rest due to error: ${error}`);
      return {
        added: false,
        rest: null,
      };
    }
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateRest: UpdateRestDto) {
    try {
      return this.restService.update(id, updateRest);
    } catch (error) {
      this.logger.error(`could not update rest due to error: ${error}`);
      return {
        updated: false,
        rest: null,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      return this.restService.findAll();
    } catch (error) {
      this.logger.error(`could not find all users due to error: ${error}`);
    }
  }
}