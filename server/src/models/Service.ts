import mongoose from 'mongoose';
import type { ServiceType } from '../types';

interface IService extends mongoose.Document, ServiceType {}

const serviceSchema = new mongoose.Schema<IService>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Export model
const Service = mongoose.model<IService>('Service', serviceSchema);

export default Service;
