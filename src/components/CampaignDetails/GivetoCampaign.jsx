import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "../Box";
import { useStateContext } from "../../context";

const GivetoCampaign = () => {
  const { donate } = useStateContext(); // Access state from context
  const [amount, setAmount] = useState("");
  const { state } = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      alert("Donation amount must be greater than 0.");
      return;
    }

    try {
      console.log(`Donating ${amount} ETH to campaign ID: ${state.pId}`);
      await donate(state.pId, amount);
      console.log("Donation successful");
    } catch (error) {
      console.error("Error in donation:", error);
      alert("Error in processing your donation: " + error.message);
    }
  };

  return (
    <Box title="Participate">
      <div className="bg-zinc-700 rounded p-4">
        <p>Please note that all donations made via blockchain are irreversible.</p>
      </div>
      <div className="flex flex-col text-black h-full justify-center items-center">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount in ETH
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => {
                  // Allow only positive numbers
                  const newValue = parseFloat(e.target.value);
                  if (newValue >= 0) {
                    setAmount(e.target.value);
                  }
                }}
                onBlur={() => {
                  // Format the value when the input loses focus
                  const formattedValue = parseFloat(amount).toFixed(5);
                  setAmount(formattedValue >= 0 ? formattedValue : "0");
                }}
                className="text-7xl font-bold text-white flex-1 block w-[100%] rounded-none rounded-r-md bg-transparent custom-placeholder outline-none"
                placeholder="0.000"
                step="0.001"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Donate
          </button>
        </form>
      </div>
    </Box>
  );
};

export default GivetoCampaign;
