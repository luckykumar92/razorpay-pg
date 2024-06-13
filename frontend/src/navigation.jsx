import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import PaymentSuccess from "./components/PaymentSuccess";
// ++++++++++++++++++++++++++++++++++++++++++++

// ################ Router ###################

// ++++++++++++++++++++++++++++++++++++++++++

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/paymentsuccess",
        element: <PaymentSuccess />,
      },
    ],
  },
]);

export default router;
