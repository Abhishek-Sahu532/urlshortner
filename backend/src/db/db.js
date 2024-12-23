import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let DbInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(`Database Connection: ${DbInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB conntection failed", error);
    process.exit(1);
  }
};

export default connectDB;
