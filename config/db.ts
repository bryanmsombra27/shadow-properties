import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("MONGODB connected");
    return;
  }

  // conect to mongodb
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    connected = true;
  } catch (error) {
    console.log(error, "DB CONNECTION ERROR");
  }
};

export default connectDB;
