import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const paymentSchema = new Schema(
  {
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    razorpay_signature: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// paymentSchema.pre("save", async function (next) {
//   if (this.isModified("razorpay_signature")) {
//     // const body = this.razorpay_order_id + "|" + this.razorpay_payment_id;
//     this.razorpay_signature = await bcrypt.hash(this.password, 10);
//     next();
//   }
// });

export const Payment = mongoose.model("Payment", paymentSchema);
