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

  const buttonClass = (coins) =>
    noOfCoins === coins
      ? "bg-blue-500 text-white font-bold py-2 px-4 rounded"
      : "border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#121212] text-white p-6 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end mb-2">
          <RxCross2 onClick={onClose} className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="mb-4">
          <h2 className="text-xl mb-4">Add Coins</h2>
          <div className="flex gap-4 mb-4">
            <button
              className={buttonClass(100)}
              onClick={() => setNoOfCoins(100)}
            >
              100 Coins
            </button>
            <button
              className={buttonClass(500)}
              onClick={() => setNoOfCoins(500)}
            >
              500 Coins
            </button>
            <button
              className={buttonClass(1000)}
              onClick={() => setNoOfCoins(1000)}
            >
              1000 Coins
            </button>
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="custom-coins">
              Custom Amount
            </label>
            <input
              type="number"
              id="custom-coins"
              placeholder="Add custom coins..."
              onChange={(e) => setNoOfCoins(Number(e.target.value))}
              className="w-full p-2 rounded bg-gray-800 text-white"
              min="0"
            />
          </div>
        </div>
        <button
          className="bg-[#5D5FEF] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={displayRazorpay}
        >
          Add Coins
        </button>
      </div>
    </div>
  );
};

export default AddCoin;
