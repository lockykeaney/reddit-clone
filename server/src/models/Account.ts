import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface T_Account {
  loginEmailAddress: string;
  password: string;
  username: string;
}

export const AccountSchema = new Schema<T_Account>({
  loginEmailAddress: {
    type: String,
    // unique: true,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  lastDateActive: {
    type: Date,
    default: new Date(),
  },
  username: {
    type: String,
    // unique: true,
    require: true,
  },
  score: {
    type: Number,
    default: 0,
  },
});

AccountSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

export const AccountModel = model<T_Account>('Account', AccountSchema);
