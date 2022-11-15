import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface T_Account {
  loginEmailAdress: string;
  password: string;
  dateCreated: Date;
  lastDateActive: Date;
  username: string;
}

export type T_AccountDocumentReturn = T_Account & Document;

export const AccountSchema = new Schema<T_Account>({
  loginEmailAdress: {
    type: String,
    unique: true,
    required: true,
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
