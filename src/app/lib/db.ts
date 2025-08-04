import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'your-mongodb-url-here';

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your .env file');
}

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
};
