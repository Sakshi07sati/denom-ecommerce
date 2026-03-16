import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {

  const navigate = useNavigate();

  return (

    <div className="flex flex-col items-center justify-center min-h-screen">

      <h1 className="text-4xl mb-4 text-green-600">
        Order Placed Successfully
      </h1>

      <button
        onClick={() => navigate("/shop")}
        className="mt-6 border px-8 py-3"
      >
        Continue Shopping
      </button>

    </div>

  );
};

export default OrderSuccess;