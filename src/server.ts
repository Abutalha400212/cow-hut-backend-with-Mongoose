import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string, {
      dbName: "Cow-Hut",
    });
    console.log(`🛢 Database is connected successfully`);
    app.listen(config.port, () => {
      console.log("Cow Hut server is running");
    });
  } catch (error) {
    console.log("Failed to connect Databese", error);
  }
}

boostrap();
