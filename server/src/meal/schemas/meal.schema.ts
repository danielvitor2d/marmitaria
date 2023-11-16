import * as mongoose from 'mongoose';

export const MealSchema = new mongoose.Schema({
  name: String,
  desc: String,
  value: String,
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
});
