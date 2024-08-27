import mongoose from 'mongoose';

// Connect to the DB
let isConnected: boolean = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) return console.log('Missing MongoDB URL');

  if (isConnected) return console.log('MongoDB is already connected');

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;

    console.log('MongoDB connected');
  } catch (err: any) {
    console.log(`MongoDB error: ${err.message}`);
  }
};

export const disconnectFromDB = async () => {
  mongoose.set('strictQuery', true);

  if (!isConnected) return console.log('MongoDB is not connected');

  try {
    await mongoose.disconnect();

    isConnected = false;

    console.log('MongoDB disconnected');
  } catch (err: any) {
    console.log(`MongoDB error: ${err.message}`);
  }
};
