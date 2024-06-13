import React from "react";
import { Link, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  // --------- Razorpay Payment Id in Params ------------------
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const razorpay_payment_id = queryParams.get("razorpay_payment_id");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex flex-col items-center justify-center space-y-4">
          <CircleCheckIcon className="w-16 h-16 text-green-500" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Order Successful
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Thank you for your order! Your items will be shipped soon.
          </p>
          <p className="text-gray-600 dark:text-gray-100">
            Razorpay Payment Id:&nbsp;&nbsp;{razorpay_payment_id}
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium text-white bg-gray-900 rounded-md shadow-sm transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
            prefetch={false}>
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
