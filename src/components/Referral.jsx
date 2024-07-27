import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Referral = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#121212] text-white p-6 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end mb-2">
          <RxCross2 onClick={onClose} className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-[#1e1e1e] p-4 rounded-lg">
            <h2 className="text-[#5D5FEF] text-sm mb-2">Your Earnings</h2>
            <p className="text-2xl font-bold">0 credits</p>
          </div>
          <div className="bg-[#1e1e1e] p-4 rounded-lg">
            <h2 className="text-[#5D5FEF] text-sm mb-2">Total Referrals</h2>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>

        <div className="bg-[#1e1e1e] p-4 rounded-lg mb-4">
          <h2 className="text-[#5D5FEF] text-sm mb-2 flex items-center">
            Refer Friends
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </h2>
          <div className="flex">
            <input
              type="text"
              value="https://dashboard.goapi.ai?referrerId=6b75e87c-352f-4a94-b0f2-bc23a8e680b3"
              className="bg-[#2a2a2a] p-2 rounded-l flex-grow text-sm"
              readOnly
            />
            <button className=" p-2 rounded-r text-sm bg-[#5D5FEF]">
              Copy text
            </button>
          </div>
        </div>

        <div className="bg-[#1e1e1e] p-4 rounded-lg">
          <h2 className="text-[#5D5FEF] text-sm mb-2">Referral History</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400">
                <th>Invitee</th>
                <th>Sign-up time (UTC)</th>
                <th>Sign-up</th>
                <th>First Credit Top-up</th>
                <th>First Subscription</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" className="text-center py-4">
                  There's no more data available
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4 text-sm">
            <div>
              Logs per page
              <select className="bg-[#2a2a2a] ml-2 p-1 rounded">
                <option>20</option>
              </select>
            </div>
            <div>
              Total Referrals: 0
              <button className="mx-2 px-3 py-1 bg-[#2a2a2a] rounded">
                &lt;
              </button>
              <span className="px-3 py-1 bg-[#2a2a2a] rounded">1</span>
              <span>/0</span>
              <button className="ml-2 px-3 py-1 bg-[#2a2a2a] rounded">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Referral;
