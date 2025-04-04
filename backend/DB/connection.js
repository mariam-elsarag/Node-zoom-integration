import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const DB = process.env.DATABASE.replace(
      "<db_password>",
      process.env.DATABASE_PASSWORD
    );
    await mongoose.connect(DB, { dbName: "Meeting" });
    console.log("DB connection established");
  } catch (err) {
    console.log("failled to connect to DB");
  }
};
export default connectToDb;
