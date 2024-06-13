import { Router } from "express";
import {
  checkout,
  paymentVerification,
} from "../controllers/payment.controller.js";
const router = Router();

// router.get("/test", (req, res) => {
//   res.send("hi");
// });

router.route("/checkout").post(checkout);

router.route("/payment-verification").post(paymentVerification);

export default router;
