import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';

import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { SuggestionsService } from './suggestion.service';

@Controller({ path: 'suggestions', version: '1.0' })
export class SuggestionController {
  private readonly logger: Logger = new Logger();

  constructor(private readonly service: SuggestionsService) {}

  @Post()
  async create(@Body() dto: CreateSuggestionDto) {
    try {
      const response = await this.service.create(dto);
      return {
        registered: response !== undefined,
        suggestion: {
          id: response._id,
          type: response.type,
          model: response.model,
        },
      };
    } catch (error) {
      this.logger.error(
        `could not create a new suggestion due to error: ${error}`,
      );
      return {
        registered: null,
      };
    }
  }

  @Delete('/:id')
  async finish(@Param('id') id: string) {
    try {
      const response = await this.service.finish(id);

      return {
        finished: response !== null,
      };
    } catch (error) {
      this.logger.error(`could not delete suggestion due to error: ${error}`);
      return {
        finished: false,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const data = await this.service.findAll();
      return data.map((sugg) => ({
        id: sugg._id,
        type: sugg.type,
        model: sugg.model,
        data: sugg.data,
      }));
    } catch (error) {
      this.logger.error(
        `could not find all suggestions due to error: ${error}`,
      );
    }
  }
}
