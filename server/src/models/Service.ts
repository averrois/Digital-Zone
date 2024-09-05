import mongoose from 'mongoose';
import { randomUUID } from 'crypto';

interface IService extends mongoose.Document {
  id: string;
  title: string;
  content: string;
}

export const serviceSchema: mongoose.Schema<IService> = new mongoose.Schema({
  id: {
    type: String,
    default: randomUUID(),
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
