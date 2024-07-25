import axios from "axios";
import React, { useEffect, useState } from "react";

const Billing = ({ open, id, selectedPlans }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("month");
  const [selectedPlanId, setSelectedPlanId] = useState(
    "66a1f6b20700ca562036fa6e"
  );
  const [price, setPrice] = useState(100);
  // const token = localStorage.getItem("Token");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          "https://configstaging.trainright.fit/api/users/plans"
        );
        setPlans(response.data.plans);
      } catch (err) {
        setError(err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handlePlanSelect = async (planId) => {
    try {
      const userId = id;
      const token = localStorage.getItem("Token");
      await axios.post(
        "https://configstaging.trainright.fit/api/users/updateUserPlan",
        {
          id: userId,
          planId: planId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      alert("Plan updated successfully");
    } catch (error) {
      alert("Failed to update plan");
      console.error(error);
    }
  };

  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    try {
      await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      const options = {
        key: "rzp_test_kyxaKvdFCrzFh2",
        currency: "INR",
        amount: Number(price) * 100,
        name: "TalkBetter",
        description: "Thanks for purchasing",
        handler: async function (response) {
          await response.razorpay_payment_id;
          setPaymentSuccess(true);
          handlePlanSelect(selectedPlanId);
        },
        prefill: {
          name: "TalkBetter",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`${
        open
          ? "lg:w-[65%] lg:left-[30%] left-[10rem] w-[60%] sm:left-[15rem] md:w-[70%] sm:w-[62%] xl:w-[79%] xl:left-[20%] xm:w-[68%]"
          : "lg:w-[93%] lg:right-[3%] lg:left-[6%] w-[70%] left-[25%]"
      } absolute flex-col gap-[24px] lg:top-[4.6rem] xl:top-[5rem] bg-black h-[85vh] rounded-3xl text-white flex justify-center items-center sm:top-[4.9rem] top-[6.9rem] overflow-hidden`}
    >
      {loading ? (
        <p>Loading...</p>
      ) : selectedPlans?._id ? (
        <h2 className="text-3xl font-bold mb-12">
          👑You are already subscribed!👑
        </h2>
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full p-8">
          <h2 className="text-3xl font-bold mb-12">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 overflow-auto">
            {plans?.map((plan) => (
              <div
                key={plan.id}
                className={`
        p-8 rounded-2xl cursor-pointer transition-all
        backdrop-filter backdrop-blur-md
        bg-white bg-opacity-10
        hover:bg-opacity-20
        border border-white border-opacity-20
        shadow-lg
        ${
          selectedPlan === plan.id
            ? "bg-blue-600 bg-opacity-30 border-blue-400"
            : ""
        }
        w-full
      `}
                onClick={() => {
                  setSelectedPlan(plan.id);
                  setSelectedPlanId(plan._id);
                  setPrice(
                    plan.price - (plan.price * plan.discountPercentage) / 100
                  );
                }}
              >
                <h3 className="md:text-2xl text-lg font-semibold mb-4">
                  {plan.name}
                </h3>
                <p className="md:text-4xl text-2xl font-bold">
                  ₹{plan.price - (plan.price * plan.discountPercentage) / 100}
                </p>
                {plan.discountPercentage != 0 && (
                  <p className="text-sm font-bold flex items-center gap-2 mt-1 ml-1">
                    <span className="line-through text-red-400">
                      {" "}
                      ₹{plan.price}
                    </span>
                    <span className=" text-green-400">
                      {plan.discountPercentage}% off
                    </span>
                  </p>
                )}
                {selectedPlan === plan.id && (
                  <p className="mt-4 text-sm">Selected</p>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={displayRazorpay}
            className="px-8 py-4 bg-[#5D5FEF] rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            Subscribe Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Billing;
