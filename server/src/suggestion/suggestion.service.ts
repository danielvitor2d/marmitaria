import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { Suggestion } from './interfaces/suggestion';

@Injectable()
export class SuggestionsService {
  constructor(
    @Inject('SUGGESTION_MODEL')
    private suggestionModel: Model<Suggestion>,
  ) {}

  async create(dto: CreateSuggestionDto) {
    const createdObj = new this.suggestionModel(dto);
    return createdObj.save();
  }

  async findAll() {
    return this.suggestionModel.find().exec();
  }

  async finish(id: string) {
    return await this.suggestionModel.findByIdAndDelete(id);
  }
}
