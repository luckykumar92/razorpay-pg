import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "T-Shirt",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "100",
  },
  {
    id: 2,
    name: "Jeans",
    imageSrc:
      "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFudHxlbnwwfHwwfHx8MA%3D%3D",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "150",
  },
  {
    id: 3,
    name: "Shirt",
    imageSrc:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hpcnR8ZW58MHx8MHx8fDA%3D",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "200",
  },
  {
    id: 4,
    name: "Shoe",
    imageSrc:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "250",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("http://www.localhost:4411/api/payments/getkey");

    const {
      data: { order },
    } = await axios.post("http://localhost:4411/api/payments/checkout", {
      amount,
    });
    // console.log(order, "order");
    const options = {
      key: key,
      amount: order.amount,
      currency: "INR",
      name: "Company Name",
      description: "Test Transaction",
      // image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww",
      order_id: order.id,
      // callback_url: "http://localhost:4411/api/payments/payment-verification",
      prefill: {
        name: "Lucky Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9876543210",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      handler: async (response) => {
        console.log("response1", response);
        try {
          const paymentVerificationResponse = await axios.post(
            "http://localhost:4411/api/payments/payment-verification",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }
          );

          if (paymentVerificationResponse.data.success) {
            console.log(
              paymentVerificationResponse.data.data.razorpay_payment_id,
              "message"
            );
            navigate(
              `/paymentsuccess?razorpay_payment_id=${paymentVerificationResponse.data.data.razorpay_payment_id}`
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#7209b7",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  // -----------------------------------------------
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Ecommerce
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id}>
              <div className="group relative">
                <div className="w-full overflow-hidden rounded-md bg-gray-200 lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="my-2 flex flex-col justify-between">
                  <div className=" flex justify-between">
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="text-sm font-medium text-gray-900">
                      ₹&nbsp;{product.price}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => checkoutHandler(product.price)}
                className="mt-2 w-full px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500 cursor-pointer">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
