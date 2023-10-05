import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://root:root@teste.lfqa0.mongodb.net/?retryWrites=true&w=majority',
      ),
  },
];
