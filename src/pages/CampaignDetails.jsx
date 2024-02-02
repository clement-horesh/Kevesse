import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import {
  GivetoCampaign,
  Loader,
  BalanceCard,
  UpdatesBox,
  TopInfo,
  MilestoneInfo,
  Donators,
} from "../components";

const CampaignDetails = () => {
  const { state } = useLocation();
  const { contract } = useStateContext();
  const [updates, setUpdates] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { getAllCampaignUpdates } = useStateContext();

  const fetchCampaignUpdates = async () => {
    const updatesData = await getAllCampaignUpdates(state.pId);
    setUpdates(updatesData);
  };

  useEffect(() => {
    if (contract) {
      fetchCampaignUpdates();
    }
  }, [contract, state.pId]);

  return (
    <div className="text-white font-Inter font-weight-800">
      <div className="w-[100%] mx-auto">
        {isLoading && <Loader />}
        <div className="relative z-10">
          <TopInfo state={state} />
        </div>
        <div className="px-4 relative z-20">
          <div className="grid h-[fit-content] grid-cols-1 md:grid-cols-3 gap-4 py-4 mx-[auto] max-w-[1900px] w-[100%]">
            <BalanceCard state={state} />
            <UpdatesBox updates={updates} />
            <GivetoCampaign state={state} />
          </div>
          <div className="grid h-[fit-content] grid-cols-1 md:grid-cols-1 gap-4 mx-[auto] max-w-[1900px] w-[100%]">
            <MilestoneInfo state={state} />
            <Donators state={state} />
          </div>
          <div className="max-w-[1900px] mx-auto">
            <h1>Story</h1>
            <p>{state.description}</p>
            <p>{state.link}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
