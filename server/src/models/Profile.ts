import { Schema, model } from 'mongoose';

export type T_Profile = {
  accountId: string;
  userName: string;
  score: number;
};

export const ProfileSchema = new Schema({
  accountId: {
    type: String,
  },
  userName: {
    type: String,
  },
  score: {
    type: Number,
    default: 0,
  },
});

export const ProfileModel = model('Profile', ProfileSchema);
