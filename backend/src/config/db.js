import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo is connected successfully");
  } catch (err) {
    console.error("err in mongoose ", err);
    process.exit(1);
  }
};
