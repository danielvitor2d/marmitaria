import * as mongoose from 'mongoose';

export const SuggestionSchema = new mongoose.Schema({
  type: String,
  model: String,
  data: Object,
});
