import React from "react";
import { daysLeft } from "../../utils";

const TopInfo = ({ state }) => {
  const remainingDays = daysLeft(state.deadline);
  const campaignTypeMap = {
    0: "BWC",
    1: "NOTBWC",
  };
  const campaignStatusMap = {
    0: "Won",
    1: "Ongoing",
    2: "Lost",
  };
  return (
    <div className="mt-[81px]  px-[20px] z-0">
      <div
        className="relative rounded-3xl max-w-[1900px] mx-auto w-full	 h-[600px] bg-cover bg-top drop-shadow-glow"
        style={{ backgroundImage: `url(${state.image})` }}
        alt="Campaign Image"
      >
        <div className="absolute inset-0 bg-zinc-900 bg-opacity-20 rounded-3xl"></div>

        <div className="absolute h-[300px] bg-gradient-to-t rounded-3xl from-zinc-900 to-transparent bottom-0 w-full left-0 pb-4 z-[100] flex flex-col justify-end">
          <div className="p-5 flex justify-between">
            <div className="flex flex-col">
              <h1 className="truncate">{state.title}</h1>
              <h4>{state.category}</h4>
            </div>
            <div className="flex items-center">
              <p className="text-gray-300 mr-20">
                {remainingDays}
                <br />
                Days Left
              </p>
              <p className="text-gray-300 mr-20">
                {campaignTypeMap[state.campaignType]}
                <br />
                Type
              </p>
              <p className="text-gray-300">
                {campaignStatusMap[state.campaignStatus]}
                <br />
                Status
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopInfo;
