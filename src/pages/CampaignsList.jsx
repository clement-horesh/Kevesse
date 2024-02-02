import React, { useState, useEffect } from "react";
import DisplayCampaigns from "../components/CampaignList/DisplayCampaigns"; // Corrected import
import { useStateContext } from "../context";
import Pagination from "../components/CampaignList/Pagination";
import CampaignNav from "../components/CampaignList/CampaignNav";

const CampaignsList = ({ initialCategoryFilter = "All" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const setInitialCategory = (category) => {
    setInitialCategory(category);
  };
  const [searchQuery, setSearchQuery] = useState("");

  const [currentCampaigns, setCurrentCampaigns] = useState([]);

  const itemsPerPage = 50;
  const [categoryFilter, setCategoryFilter] = useState(initialCategoryFilter);
  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div>
      <div className="pt-[56px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-17%,rgba(72,155,240,0.3),rgba(0,0,0,0))] w-100%"></div>
      <div className="px-[20px] w-[100%] mx-auto">
        <div className="max-w-[1900px] mx-auto">
          <CampaignNav
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
          <DisplayCampaigns
            title="All Campaigns"
            isLoading={isLoading}
            campaigns={campaigns}
            categoryFilter={categoryFilter}
          />
          <Pagination
            campaigns={campaigns}
            itemsPerPage={itemsPerPage}
            setPaginatedCampaigns={setCurrentCampaigns}
            categoryFilter={categoryFilter}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </div>
  );
};

export default CampaignsList;
