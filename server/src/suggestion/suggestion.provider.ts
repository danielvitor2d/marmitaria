import { Connection } from 'mongoose';
import { SuggestionSchema } from './schemas/suggestion.schema';

export const suggestionProviders = [
  {
    provide: 'SUGGESTION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Suggestion', SuggestionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
