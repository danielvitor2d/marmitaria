import { Connection } from 'mongoose';

import { MealSchema } from './schemas/meal.schema';

export const mealsProviders = [
  {
    provide: 'MEAL_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Meal', MealSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
