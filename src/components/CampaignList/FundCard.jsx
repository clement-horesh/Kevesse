import React from "react";
import { daysLeft } from "../../utils";
import { Icons } from "../../assets";

const FundCard = ({
  title,
  description,
  category,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);
  const percentage = ((amountCollected / target) * 100).toFixed(0);
  const formattedPercentage = percentage > 9999 ? ">9999%" : `${percentage}%`;

  const cardStyle = {
    cursor: "pointer",
    width: "100%",
    borderRadius: "13px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "relative", // Added for absolute positioning of children
    transition: "transform 0.3s ease-in-out",
  };

  const imageStyle = {
    width: "100%",
    height: "132px",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const textStyle = {
    position: "absolute", // Absolute positioning
    top: 150, // Position at the top of the parent
    left: 0, // Align to the left
    width: "100%", // Take full width of the parent
    height: "120px",
    paddingTop: "11px", // Top padding
    paddingBottom: "13px", // Bottom padding
    paddingLeft: "12px", // Left padding
    paddingRight: "12px", // Right padding
    backgroundColor: "rgba(50, 50, 50, 0.3)", // Background color with transparency
    backdropFilter: "blur(100px)", // Apply a backdrop blur effect
  };

  const backStyle = {
    height: "138px",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transform: "scaleY(-1)",
  };

  const formatEthAmount = (amount) => {
    const roundUpEth = (amount) => Math.ceil(amount * 100) / 100;
    const roundedAmount = roundUpEth(amount);
    return roundedAmount < 0.01 ? ">0.01" : `${roundedAmount.toFixed(2)} ETH`;
  };

  return (
    <div
      className="border-[1px] border-opacity-10 border-white hover:border-opacity-20"
      style={cardStyle}
      onClick={handleClick}
    >
      <div style={imageStyle}></div>
      <div style={backStyle}></div> {/* This div is now under the text div */}
      <div style={textStyle} className="flex flex-col justify-between h-full">
        <div>
          <h3 className="text-[16px] font-semibold text-white truncate">
            {title}
          </h3>
          <div className="badge text-stone-400 text-[13px]">{category}</div>
        </div>
        <div className="flex justify-between text-white items-center">
          <p className="text-xs text-white">
            {formattedPercentage}
            <br />
            <span className="text-stone-400 flex flex-row">
              {formatEthAmount(target)}{" "}
              <Icons color="rgb(180, 188, 208)" size="16" iconType="Eth" />
            </span>
          </p>
          <div className="badge text-[13px] text-stone-300 bg-[black] px-4 py-2 rounded-[20px]">
            {remainingDays} days
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
