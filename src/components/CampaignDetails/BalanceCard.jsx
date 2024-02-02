import React from "react";
import Box from "../Box";

const BalanceCard = ({ state }) => {
  const progress = (state.amountCollected / state.target) * 100;

  return (
    <Box title="Balance">
      <div className="flex flex-col h-full  justify-center items-center">
        {state.amountCollected > 0 ? (
          <>
            <div className="flex tracking-tighter bg-gradient-to-r  from-amber-200 to-yellow-400 bg-clip-text text-transparent text-7xl font-bold w-fit">
              <span className="my-auto mr-[3px]">
                {progress > 1000 ? "+1000" : progress.toFixed(0)}
              </span>
             
            </div>
            <div className="flex mt-10">
              <div className="">
                {state.amountCollected} {`Raised of ${state.target}`}
              </div>
            </div>
          </>
        ) : (
          <div className="font-Inter pb-5 font-light text-gray-300 text-xl">
            No donations yet
          </div>
        )}
      </div>
    </Box>
  );
};

export default BalanceCard;
