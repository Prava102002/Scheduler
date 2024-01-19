import mongoose from "mongoose";
import config from "./config";
import express from "express";
import { Application } from "express";

const app: Application = express();

// Creating the express app
app.use(express.json());

const DB_URI: string = config.mongoose.url;

mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to DB at ", DB_URI))
  .catch(() => console.log("Failed to connect to DB at", DB_URI));

app.listen(config.port, () => {
  console.log(`App is running on port ${config.port}`);
});
