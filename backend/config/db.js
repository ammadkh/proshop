import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("db connect", conn.connection.host);
  } catch (error) {
    console.log(error, "mongo db connection error");
    process.exit();
  }
};
