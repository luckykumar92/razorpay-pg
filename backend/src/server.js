import dotenv from "dotenv";
import connectDB from "./db/database.js";
import { app } from "./app.js";
import Razorpay from "razorpay";

dotenv.config({
  path: "./.env",
});

connectDB();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

app.listen(process.env.PORT || 7979, () => {
  console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
});
