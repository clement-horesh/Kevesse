import React, { useState } from "react";
import DisplayCampaigns from "../components/CampaignList/DisplayCampaigns";
import CampaignNav from "../components/CampaignList/CampaignNav";

const CampaignsList = ({ initialCategoryFilter = "All" }) => {
  const [categoryFilter, setCategoryFilter] = useState(initialCategoryFilter);

  return (
    <div className="mt-[56px] px-[20px]">
      <CampaignNav
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />
      <DisplayCampaigns title="All Campaigns" categoryFilter={categoryFilter} />
    </div>
  );
};

export default CampaignsList;
