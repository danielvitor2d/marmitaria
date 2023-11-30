import * as mongoose from 'mongoose';

export const ReviewSchema = new mongoose.Schema({
  cntStar: Number,
  comments: String,
  meal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal',
  },
});
