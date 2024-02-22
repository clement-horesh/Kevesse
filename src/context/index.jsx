import React, { useContext, createContext } from "react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const getCampaignMilestones = async (pId) => {};
  const getAllCampaignUpdates = async (pId) => {};
  const getAllDonationsForCampaign = async (pId) => {};
  const { mutateAsync: donate } = 1;
  const address = 1;
  const connect = 1;
  const handleDonate = async (campaignId, amount) => {};

  const publishCampaign = async (form) => {};

  const getCampaigns = async () => {};

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getCampaignMilestones, // Add the new function here
        getAllCampaignUpdates,
        getAllDonationsForCampaign,
        donate: handleDonate,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
