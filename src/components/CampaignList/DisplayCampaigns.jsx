import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import FundCard from "./FundCard"; // Adjust the import path as necessary

const DisplayCampaigns = ({ categoryFilter = "All" }) => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function getCampaigns() {
      let q;
      if (categoryFilter !== "All") {
        q = query(
          collection(db, "Campaign"),
          where("Category", "==", categoryFilter)
        );
      } else {
        q = query(collection(db, "Campaign"));
      }

      const campaignSnapshot = await getDocs(q);
      const campaignList = campaignSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCampaigns(campaignList);
    }

    getCampaigns();
  }, [categoryFilter]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 pt-[20px]">
      {campaigns.map((campaign) => (
        <FundCard
          key={campaign.id}
          title={campaign.Title}
          description={campaign.description}
          category={campaign.Category}
          target={campaign.Target}
          deadline={campaign.Deadline} // Ensure your campaign data includes a Deadline
          amountCollected={campaign.AmountCollected} // Ensure your campaign data includes AmountCollected
          image={campaign.Image}
          handleClick={() => console.log(`Clicked on ${campaign.Title}`)} // Example click handler
        />
      ))}
    </div>
  );
};

export default DisplayCampaigns;
