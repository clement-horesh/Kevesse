import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xe88FC0E87ac8c58B59B2b24a95048a7f64B83786"
  );
  const { mutateAsync: createCampaign, isLoading } = useContractWrite(
    contract,
    "createCampaign"
  );
  const getCampaignMilestones = async (pId) => {
    try {
      const milestones = await contract.call("getCampaignMilestones", [pId]);
      return milestones;
    } catch (error) {
      return [];
    }
  };
  const getAllCampaignUpdates = async (pId) => {
    try {
      const updates = await contract.call("getAllCampaignUpdates", [pId]);
      return updates;
    } catch (error) {
      return [];
    }
  };
  const getAllDonationsForCampaign = async (pId) => {
    try {
      const donations = await contract.call("getAllDonationsForCampaign", [pId]);
      return donations;
    } catch (error) {
      console.error('Error retrieving donations:', error);
      return [];
    }
  };
  const { mutateAsync: donate } = useContractWrite(contract, "donate");
  const address = useAddress();
  const connect = useMetamask();
  const handleDonate = async (campaignId, amount) => {
    try {
      console.log("Received campaignId:", campaignId, "Amount:", amount);

      if (
        campaignId === null ||
        campaignId === undefined ||
        campaignId === ""
      ) {
        alert("Please enter a valid campaign ID.");
        return;
      }

      if (!amount || Number(amount) <= 0) {
        alert("Please enter an amount greater than 0.");
        return;
      }

      // Convert amount to wei
      const weiValue = ethers.utils.parseEther(amount.toString());

      // Perform the transaction
      const tx = await donate({
        args: [campaignId],
        overrides: {
          value: weiValue, // Setting the amount of Ether to send
        },
      });

      console.log("Donation successful, transaction response:", tx);
    } catch (error) {
      console.error("Donation failed", error);
      alert("Donation failed: " + error.message);
    }
  };

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          form.category, // category
          form.target,
          Math.floor(new Date(form.deadline).getTime() / 1000), // deadline, convert ms to seconds
          form.image, // image
        ],
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    const {
      owners,
      titles,
      descriptions,
      categories,
      targets,
      deadlines,
      amountCollecteds,
      images,
      campaignTypes,
      campaignStatuses,
    } = await contract.call("getCampaigns");

    const parsedCampaigns = titles.map((title, i) => ({
      title: title,
      owner: owners[i],
      description: descriptions[i],
      category: categories[i],
      target: ethers.utils.formatEther(targets[i].toString()),
      deadline: deadlines[i].toNumber(),
      amountCollected: ethers.utils.formatEther(amountCollecteds[i].toString()),
      image: images[i],
      campaignType: campaignTypes[i],
      campaignStatus: campaignStatuses[i],
      pId: i,
    }));

    console.log(parsedCampaigns);
    return parsedCampaigns;
  };
  const getCampaignById = async (campaignId) => {
    console.log(`Fetching campaign data for ID: ${campaignId}`);
    try {
      const campaignData = await contract.call("campaigns", [campaignId]);
      console.log("Raw campaign data:", campaignData);

      if (!campaignData || Object.keys(campaignData).length === 0) {
        console.log(`No data found for campaign ID: ${campaignId}`);
        return null;
      }

      const formattedCampaign = {
        id: campaignId,
        title: campaignData.title,
        owner: campaignData.owner,
        description: campaignData.description,
        category: campaignData.category,
        target: ethers.utils.formatEther(campaignData.target.toString()),
        deadline: campaignData.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campaignData.amountCollected.toString()
        ),
        image: campaignData.image,
        campaignType: campaignData.campaignType,
        campaignStatus: campaignData.campaignStatus,
      };

      console.log("Formatted Campaign Data:", formattedCampaign);
      return formattedCampaign;
    } catch (error) {
      console.error("Error fetching campaign data:", error);
      return null;
    }
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getCampaignMilestones, // Add the new function here
        getUserCampaigns,
        getAllCampaignUpdates,
        getAllDonationsForCampaign,
        getCampaignById,
        donate: handleDonate,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
