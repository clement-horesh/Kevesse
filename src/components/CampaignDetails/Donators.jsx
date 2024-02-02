import React, { useState, useEffect } from "react";
import { DonatorsLine, DonatorsList } from "../";
import { useStateContext } from "../../context";

const Donators = ({ state }) => {
  const [donations, setDonations] = useState([]);
  const { getAllDonationsForCampaign } = useStateContext();
  const { contract } = useStateContext();

  const fetchDonations = async () => {
    try {
      const fetchedDonations = await getAllDonationsForCampaign(state.pId);
      setDonations(fetchedDonations);
    } catch (error) {
      console.error("Error retrieving donations:", error);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchDonations();
    }
  }, [contract, state.pId]);

  return (
    <>
      <div className="grid h-[fit-content] grid-cols-1 md:grid-cols-2 gap-4 mx-[auto] max-w-[1900px] w-[100%]">
        <DonatorsList
          state={state}
          donations={donations}
          fetchDonations={fetchDonations}
        />
        <DonatorsLine
          state={state}
          donations={donations}
          fetchDonations={fetchDonations}
        />
      </div>
    </>
  );
};

export default Donators;
