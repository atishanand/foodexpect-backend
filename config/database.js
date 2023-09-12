import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database is connected with host ${connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
