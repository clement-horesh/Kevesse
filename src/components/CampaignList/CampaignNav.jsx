import React from 'react';

function CategoryButton({ category, setCategoryFilter, currentFilter }) {
  return (
    <button
      onClick={() => setCategoryFilter(category)}
      className={`px-3 py-1 rounded-full border-[1px] border-white border-opacity-10 text-[13px] font-medium ${
        currentFilter === category
          ? "text-white bg-[white] bg-opacity-10" // Active style
          : "text-[#e0e0e0] hover:bg-[white] hover:bg-opacity-[6%] bg-[white] bg-opacity-[3%] hover:text-white" // Normal style
      }`}
    >
      {category}
    </button>
  );
}

const CampaignNav = ({ categoryFilter, setCategoryFilter }) => {
  return (
    <nav className="backdrop-blur-l border-b-[0.1px] mx-auto border-opacity-10 border-white">
        <div className="max-w-[100%] mx-auto">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-baseline space-x-2">
              {/* Existing Category Buttons */}
              <CategoryButton
                category="All"
                setCategoryFilter={setCategoryFilter}
                currentFilter={categoryFilter}
              />
              <CategoryButton
                category="FinTech"
                setCategoryFilter={setCategoryFilter}
                currentFilter={categoryFilter}
              />
              <CategoryButton
                category="GameFi"
                setCategoryFilter={setCategoryFilter}
                currentFilter={categoryFilter}
              />
              <CategoryButton
                category="Web3"
                setCategoryFilter={setCategoryFilter}
                currentFilter={categoryFilter}
              />
              <CategoryButton
                category="SocialID"
                setCategoryFilter={setCategoryFilter}
                currentFilter={categoryFilter}
              />
              <CategoryButton
                category="EduHealth"
                setCategoryFilter={setCategoryFilter}
                currentFilter={categoryFilter}
              />
            </div>
            <div className='flex items-baseline space-x-2'>
              <CategoryButton
                  category="BWC"
                  setCategoryFilter={setCategoryFilter}
                  currentFilter={categoryFilter}
                />
              <CategoryButton
                category="NOTBWC"
                setCategoryFilter={setCategoryFilter}
                currentFilter={categoryFilter}
              />
            </div>
          </div>
        </div>
      </nav>
  );
};

export default CampaignNav;
