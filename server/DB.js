import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const Connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
    console.log("Database Connected Succssefully");
  } catch (error) {
    console.log("Error while connecting with database ", error);
  }
};

export default Connection;
