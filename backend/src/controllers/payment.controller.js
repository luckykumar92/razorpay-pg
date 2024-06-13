import { Payment } from "../models/payment.model.js";
import { instance } from "../server.js";
import crypto from "crypto";

const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  try {
    // Create Sign
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    // Create ExpectedSign
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Database comes here
      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      // Save Payment
      await payment.save();

      res.status(200).json({
        success: true,
        data: { razorpay_payment_id: razorpay_payment_id },
        message: "Payement Successfully Done!",
      });

      // res.redirect(
      //   `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      // );
    }
  } catch (error) {
    res.status(500).json({ message: " Something went wrong" });
    console.log(error);
  }
};

export { checkout, paymentVerification };
