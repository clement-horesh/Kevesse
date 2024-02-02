import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../../assets";
import FundCard from "./FundCard";

const DisplayCampaigns = ({
  isLoading,
  campaigns,
  initialCategoryFilter = "All",
}) => {
  const navigate = useNavigate();
  const [currentCampaigns, setCurrentCampaigns] = useState([]);

  useEffect(() => {
    setCurrentCampaigns(campaigns);
  }, [campaigns]);

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      {/* Campaigns display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 mt-4 gap-y-4">
        {isLoading ? (
          // Show loader when loading
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        ) : currentCampaigns.length === 0 ? (
          // Show no campaigns message if not loading and no campaigns
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[black]">
            No campaigns available
          </p>
        ) : (
          // Show campaigns
          currentCampaigns.map((campaign) => (
            <FundCard
              key={campaign.pId}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
