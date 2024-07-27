import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const AddCoin = ({ isOpen, onClose, userId, planId }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noOfCoins, setNoOfCoins] = useState(1000);

  if (!isOpen) return null;

  const handleAddCoins = async () => {
    const token = localStorage.getItem("Token");
    try {
      await axios.post(
        "http://localhost:7006/api/users/updateUserCoins",
        {
          id: userId,
          planId: planId,
          coins: noOfCoins,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      alert("Coin added successfully!");
      window.location.reload();
    } catch (error) {
      alert("Failed to add coins!");
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
        amount: Number(noOfCoins) * 100,
        name: "TalkBetter",
        description: "Thanks for purchasing",
        handler: async function (response) {
          await response.razorpay_payment_id;
          setPaymentSuccess(true);
          handleAddCoins();
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
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add Coins</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <RxCross2 className="w-6 h-6" />
          </button>
        </div>
        <div className="mb-8">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[100, 500, 1000].map((amount) => (
              <button
                key={amount}
                onClick={() => setNoOfCoins(amount)}
                className={`
              py-3 px-4 rounded-lg text-lg font-semibold
              ${
                noOfCoins === amount
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }
            `}
              >
                {amount} Coins
              </button>
            ))}
          </div>

          <div>
            <label
              className="block mb-2 text-lg font-medium"
              htmlFor="custom-coins"
            >
              Custom Amount
            </label>
            <input
              type="number"
              id="custom-coins"
              placeholder="Add custom coins..."
              onChange={(e) => setNoOfCoins(Number(e.target.value))}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min="0"
            />
          </div>
        </div>

        <button
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg text-lg"
          onClick={displayRazorpay}
        >
          Add Coins
        </button>
      </div>
    </div>
  );
};

export default AddCoin;
