import * as mongoose from 'mongoose';

export const RestaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  value: String,
  paymentforms: String,
  isSuggestion: Boolean,
  meals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
});
