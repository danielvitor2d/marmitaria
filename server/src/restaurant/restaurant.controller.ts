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
        registered: response !== undefined,
      };
    } catch (error) {
      this.logger.error(`could not create a new user due to error: ${error}`);
      return {
        registered: null,
      };
    }
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateRest: UpdateRestDto) {
    try {
      return this.restService.update(id, updateRest);
    } catch (error) {
      this.logger.error(`could not update user due to error: ${error}`);
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
