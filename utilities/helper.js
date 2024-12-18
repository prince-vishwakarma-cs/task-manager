import mongoose from "mongoose";

export const connectDB = (uri, dbName) => {
  try {
    mongoose
      .connect(uri, {
        dbName,
      })
      .then(() => console.log("Database is connected"));
  } catch (error) {
    console.log(error);
  }
};
