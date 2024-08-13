import mongoose  from 'mongoose';
import { config } from 'dotenv';
config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // TODO: Properties below weren't functioning and were throwing errors. Check functionality and fix, replace, or delete
      // useFindAndModify: false,
      // useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

