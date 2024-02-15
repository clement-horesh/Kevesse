import React, { useState, useEffect } from "react";
import Box from "../Box";
import { useStateContext } from "../../context";

const MilestoneInfos = ({ state }) => {
  const { getCampaignMilestones } = useStateContext();
  const [milestones, setMilestones] = useState([]);
  const [validMilestoneCount, setValidMilestoneCount] = useState(0); // State for valid milestones count
  const { contract } = useStateContext();
  const progress = (state.amountCollected / state.target) * 100;

  const fetchMilestones = async () => {
    const fetchedMilestones = await getCampaignMilestones(state.pId);
    setMilestones(fetchedMilestones);
    const count = fetchedMilestones.filter(
      (milestone) =>
        milestone.title && milestone.description && milestone.target
    ).length;
    setValidMilestoneCount(count);
  };

  useEffect(() => {
    if (contract) {
      fetchMilestones();
    }
  }, [contract, state.pId]);

  const formatEther = (value) => {
    return 1;
  };
  const gridColumnCount = Math.min(validMilestoneCount + 1, 4); // Ensure maximum 4 columns

  // Inline style for dynamic grid columns
  const gridStyle = {
    gridTemplateColumns: `repeat(${gridColumnCount}, minmax(0, 1fr))`,
  };
  return (
    <Box title={`Milestones (${validMilestoneCount})`}>
      <div className="grid gap-4 " style={gridStyle}>
        {/* Left Side - Progress Bar */}
        <div className="hover:bg-zinc-700 h-[100%] transition duration-200 ease-in-out rounded">
          <div className="w-full flex justify-between text-xs">
            <span>0</span>
            <span>{progress.toFixed(2)}% Collected</span>
            <span>{state.target} ETH</span>
          </div>
          <div className="relative w-full bg-gray-300 rounded overflow-hidden my-2">
            <div
              className="bg-blue-500 h-4"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Right Side - Milestones */}
        {validMilestoneCount > 0 ? (
          milestones.slice(0, 3).map((milestone, index) => (
            <div
              key={index}
              className="milestone-item p-3 hover:bg-zinc-700 transition duration-200 ease-in-out rounded"
            >
              {/* Milestone Details */}
              <p>{milestone.title}</p>
              <h4>Description: {milestone.description}</h4>
              <h4>Target: {formatEther(milestone.target)} ETH</h4>
            </div>
          ))
        ) : (
          <p>No milestones available.</p>
        )}
      </div>
    </Box>
  );
};

export default MilestoneInfos;
