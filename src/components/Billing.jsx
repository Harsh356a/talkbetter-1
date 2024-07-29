import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const PricingPlan = ({ plan, isSelected, onSelect, isBestValue }) => (
  <div
    className={`relative bg-gradient-to-r from-gray-700 to-gray-900 p-8 rounded-lg shadow-lg transform transition-transform duration-300 ${
      isSelected
        ? "border-4 border-[#5D5FEF] scale-105"
        : "border-2 border-gray-700"
    }`}
  >
    {isBestValue && (
      <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-lg text-sm font-bold">
        Best Value
      </div>
    )}
    <h2 className="text-2xl font-bold text-white mb-4">{plan.name}</h2>
    <div className="flex items-baseline gap-2 mb-6">
      <p className="text-4xl font-extrabold text-white">
        ₹{plan.price - plan.discount}
        <span className="text-lg font-normal">/{plan.id}</span>
      </p>
      {plan.discount > 0 && (
        <p className="text-md text-green-400">Save ₹{plan.discount}</p>
      )}
    </div>
    <button
      onClick={() => onSelect(plan.id, plan.price)}
      className={`w-full py-3 rounded-md mb-6 transition duration-300 ${
        isSelected
          ? "bg-green-500 hover:bg-green-600"
          : "bg-[#5D5FEF] hover:bg-blue-600"
      } text-white font-bold`}
    >
      {isSelected ? "Plan Selected" : "Choose Plan"}
    </button>
    <ul className="space-y-4">
      <li className="flex items-center text-lg text-gray-300">
        <svg
          className="w-5 h-5 mr-3 text-green-500 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        {plan.coins} Coins
      </li>

      <li className="flex items-center text-lg text-gray-300">
        <svg
          className="w-5 h-5 mr-3 text-green-500 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        24/7 customer support
      </li>
    </ul>
  </div>
);

const Billing = ({ open, id, selectedPlans }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("year");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [price, setPrice] = useState(1000);
  // const token = localStorage.getItem("Token");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          "https://configstaging.trainright.fit/api/users/plans"
        );
        setPlans(response.data.plans);
        if (selectedPlanId === "") {
          setSelectedPlanId(response.data.plans[1]?._id);
        }
      } catch (err) {
        setError(err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [selectedPlanId]);

  console.log(selectedPlanId);
  const handlePlanSelect = async (id, planId) => {
    try {
      const userId = id;
      const token = localStorage.getItem("Token");
      await axios.post(
        "https://configstaging.trainright.fit/api/users/updateUserPlan",

        {
          id: id,
          planId: planId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      alert("Plan updated successfully");
      window.location.reload();
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
          handlePlanSelect(id, selectedPlanId);
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

  const handleChangePlan = (plan, planId, planPrice) => {
    setSelectedPlan(plan);
    setSelectedPlanId(planId);
    setPrice(planPrice);
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
      ) : !selectedPlans?._id ? (
        <h2 className="text-3xl font-bold mb-12">
          👑You are already subscribed!👑
        </h2>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-white text-center mb-12">
            Choose Your Plan
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plans.map((plan) => (
              <PricingPlan
                key={plan.id}
                plan={plan}
                isSelected={selectedPlan === plan.id}
                onSelect={() =>
                  handleChangePlan(
                    plan.id,
                    plan._id,
                    plan.price - plan.discount
                  )
                }
              />
            ))}
          </div>
          <button
            onClick={displayRazorpay}
            className="font-bold hover:scale-105 mt-8 bg-[#5D5FEF] text-white py-3 px-6 rounded-md hover:bg-[#5D5FEF] transition duration-300"
          >
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
};

export default Billing;
