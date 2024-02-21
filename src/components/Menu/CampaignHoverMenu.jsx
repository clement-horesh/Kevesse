import React, { useState } from "react";
import { Icons, bgmenu1, bgmenu2 } from "../../assets";
import { useNavigate } from "react-router-dom"; // Make sure to import useNavigate

const CampaignHoverMenu = ({ handleMouseEnter, handleMouseLeave }) => {
  const navigate = useNavigate();
  const [categories] = useState([
    {
      name: "All",
      description: "All Categories",
      iconType: "All",
    },
    {
      name: "FinTech",
      description: "Financial Technology",
      iconType: "coin",
    },
    {
      name: "GameFi",
      description: "Gaming and Finance",
      iconType: "Gamepad",
    },
    {
      name: "Web3",
      description: "Decentralized Web",
      iconType: "web",
    },
    {
      name: "EduHealth",
      description: "Education & Healthcare",
      iconType: "heartIcon",
    },
    // Add other categories as needed
  ]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isCampaignButtonHovered, setIsCampaignButtonHovered] = useState(false);

  const handleCategoryMouseEnter = (categoryName) => {
    setHoveredCategory(categoryName);
  };
  const handleCategoryMouseLeave = () => {
    setHoveredCategory(null);
  };
  const renderIcon = (iconType, hovered, name) => {
    const iconColor = hovered === name ? "white" : "rgb(180, 188, 208)";
    const iconSize = 17;

    switch (iconType) {
      case "All":
        return <Icons color={iconColor} size={iconSize} iconType="All" />;
      case "Gamepad":
        return <Icons color={iconColor} size={iconSize} iconType="gamepad" />;
      case "web":
        return <Icons color={iconColor} size={iconSize} iconType="safari" />;
      case "coin":
        return <Icons color={iconColor} size={iconSize} iconType="coin" />;
      case "heartIcon":
        return <Icons color={iconColor} size={iconSize} iconType="heartIcon" />;
      case "faceid":
        return <Icons color={iconColor} size={iconSize} iconType="faceid" />;
      default:
        return null;
    }
  };

  return (
    <div
      className="absolute top-[40px] w-[max-content] border-[1px] border-opacity-10 border-white backdrop-blur-3xl bg-white bg-opacity-5 p-2 rounded-xl shadow-2xl left-0"
      onMouseEnter={() => handleMouseEnter("Campaigns")}
      onMouseLeave={handleMouseLeave}
    >
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <div className="flex flex-col gap-1 text-white">
          {categories.map((category, index) => (
            <button
              key={category.name}
              className="group text-left cursor-pointer w-full p-[9px] px-[13px] rounded-lg bg-transparent hover:bg-[white] hover:bg-opacity-10 text-white"
              style={{ zIndex: index }}
              onMouseEnter={() => handleCategoryMouseEnter(category.name)}
              onMouseLeave={handleCategoryMouseLeave}
            >
              <div className="flex">
                <div className="w-[fit-content] mt-[2px]">
                  {renderIcon(
                    category.iconType,
                    hoveredCategory,
                    category.name
                  )}
                </div>
                <div className="ml-[10px]">
                  <p className="text-[14px]">{category.name}</p>
                  <h4 className="text-[13px] group-hover:text-[#d2d2d2]">
                    {category.description}
                  </h4>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="flex flex-col">
          <div
            className="mb-2 rounded-lg bg-cover hover:filter-none grayscale bg-no-repeat bg-right	"
            style={{ backgroundImage: `url(${bgmenu1})` }}
          >
            <div
              onClick={() => navigate("/create-campaign")} // Add this line
              className="group flex flex-col rounded-lg border-[1px] border-opacity-10 hover:cursor-pointer hover:border-opacity-20 border-white hover:bg-white/10 bg-white/2 	p-[9px] h-[115px] w-[300px]"
            >
              <p className="text-[14px]">Create a campaign</p>
              <span className="grow"></span>
              <h4 className="group-hover:text-[#d2d2d2] text-[12px]">
                The first step towards
                <br />
                creating something great
              </h4>
            </div>
          </div>
          <div
            className="   mb-2 rounded-lg bg-cover bg-no-repeat hover:filter-none grayscale bg-right	"
            style={{ backgroundImage: `url(${bgmenu2})` }}
          >
            <div className="group flex flex-col rounded-lg border-[1px] border-opacity-10 hover:cursor-pointer hover:border-opacity-20 border-white hover:bg-white/10 bg-white/2	p-[9px] h-[115px] w-[300px]">
              <p className="text-[14px]">My Campaigns</p>
              <span className="grow"></span>
              <h4 className="group-hover:text-[#d2d2d2] text-[12px]">
                Edit, track & analyse
                <br />
                your campaigns
              </h4>
            </div>
          </div>
          <button
            className="group flex items-center text-left cursor-pointer  w-full grow p-[9px] rounded-lg bg-transparent hover:bg-[white] hover:bg-opacity-10"
            onMouseEnter={() => setIsCampaignButtonHovered(true)}
            onMouseLeave={() => setIsCampaignButtonHovered(false)}
          >
            <div className="flex mx-auto items-center">
              <h4 className="text-[14px] group-hover:text-white">
                Campaigns you financed
              </h4>
              <div className="ml-[1px] mt-[1px]">
                <Icons
                  iconType="chevronRight"
                  size={17}
                  color={
                    isCampaignButtonHovered ? "white" : "rgb(180, 188, 208)"
                  }
                />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignHoverMenu;
