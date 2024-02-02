import React, { useState } from "react";
import Box from "../Box";
import { ethers } from "ethers";

const DonatorsList = ({ state, donations, fetchDonations }) => {
  const [sortMode, setSortMode] = useState("mostRecent");

  function timeSince(timestamp) {
    const timestampInMilliseconds = timestamp * 1000;
    const donationDate = new Date(timestampInMilliseconds);
    const now = new Date();
    const difference = now - donationDate;

    if (difference < 0) {
      return "In the future";
    }

    const seconds = Math.floor(difference / 1000);
    if (seconds < 60) {
      return seconds === 1 ? "1 second ago" : seconds + " seconds ago";
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return minutes === 1 ? "1 minute ago" : minutes + " minutes ago";
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return hours === 1 ? "1 hour ago" : hours + " hours ago";
    }

    const days = Math.floor(hours / 24);
    if (days < 7) {
      return days === 1 ? "1 day ago" : days + " days ago";
    }

    const weeks = Math.floor(days / 7);
    if (weeks < 4) {
      return weeks === 1 ? "1 week ago" : weeks + " weeks ago";
    }

    const months = Math.floor(days / 30); // Approximation
    if (months < 12) {
      return months === 1 ? "1 month ago" : months + " months ago";
    }

    const years = Math.floor(days / 365); // Approximation
    return years === 1 ? "1 year ago" : years + " years ago";
  }
  const sortDonations = () => {
    let sortedDonations = [...donations];
    switch (sortMode) {
      case "biggest":
        sortedDonations.sort(
          (a, b) => parseFloat(b.amount) - parseFloat(a.amount)
        );
        break;
      case "smallest":
        sortedDonations.sort(
          (a, b) => parseFloat(a.amount) - parseFloat(b.amount)
        );
        break;
      case "oldest":
        sortedDonations.sort((a, b) => a.timestamp - b.timestamp);
        break;
      case "mostRecent":
      default:
        sortedDonations.sort((a, b) => b.timestamp - a.timestamp);
        break;
    }
    return sortedDonations;
  };
  React.useEffect(() => {
    if (state.contract) {
      fetchDonations();
    }
  }, [state.contract, state.pId, fetchDonations]);

  return (
    <Box title="Latest Donations">
      <div>
        <label htmlFor="sortingDropdown">Sort by: </label>
        <select
          id="sortingDropdown"
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value)}
        >
          <option value="mostRecent">Most Recent</option>
          <option value="oldest">Oldest</option>
          <option value="biggest">Biggest Amount</option>
          <option value="smallest">Smallest Amount</option>
        </select>
      </div>
      {donations.length > 0 ? (
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {sortDonations().map((donation, index) => {
            const donationItemStyle = {
              backgroundColor: "rgba(78, 78, 78)",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              padding: "15px",
              margin: "5px 0",
            };

            return (
              <li key={index} style={donationItemStyle}>
                <span>{ethers.utils.formatEther(donation.amount)} ETH</span>
                <span>{timeSince(donation.timestamp)}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No donations found.</p>
      )}
    </Box>
  );
};

export default DonatorsList;
