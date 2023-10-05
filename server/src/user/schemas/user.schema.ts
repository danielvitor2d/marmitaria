import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  address: String,
  pwd: String,
});
