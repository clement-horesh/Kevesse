import React, { useState, useEffect } from 'react';

const Pagination = ({ campaigns, itemsPerPage, setPaginatedCampaigns, categoryFilter, searchQuery }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Calculate the number of pages
    const filteredCampaigns = campaigns.filter((campaign) => {
      const categoryCondition =
        categoryFilter === "All" || campaign.category === categoryFilter;
      const searchCondition = campaign.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return categoryCondition && searchCondition;
    });

    // Calculate indexes for slicing
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Update the campaigns in the parent component
    setPaginatedCampaigns(filteredCampaigns.slice(indexOfFirstItem, indexOfLastItem));

    // Reset to first page when filters change
    setCurrentPage(1);
  }, [campaigns, currentPage, itemsPerPage, categoryFilter, searchQuery, setPaginatedCampaigns]);

  // Calculate total page count
  const pageCount = Math.ceil(campaigns.length / itemsPerPage);
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= pageCount; i++) {
      // Logic to limit the number of page numbers displayed
      if (i === 1 || i === pageCount || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pageNumbers.push(
          <button
            key={i}
            className={`px-2 py-1 text-sm font-medium ${currentPage === i ? 'text-red-500' : 'hover:text-gray-700'}`}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        // Ellipsis for skipped numbers
        pageNumbers.push(
          <span key={i} className="text-sm font-medium">...</span>
        );
      }
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center space-x-1">
      {renderPageNumbers()}
    </div>
  );
};

export default Pagination;
