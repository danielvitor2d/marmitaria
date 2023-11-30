import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { SuggestionController } from './suggestion.controller';
import { suggestionProviders } from './suggestion.provider';
import { SuggestionsService } from './suggestion.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SuggestionController],
  providers: [SuggestionsService, ...suggestionProviders],
})
export class SuggestionsModule {}
