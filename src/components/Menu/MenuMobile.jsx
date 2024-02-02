import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../../assets";
import { Icons } from "../../assets";
import { ConnectWallet } from "@thirdweb-dev/react";
import CampaignHoverMenu from "./CampaignHoverMenu";

const Logo = ({ styles, imgUrl, handleClick }) => (
  <div
    className={`flex justify-center items-center cursor-pointer ${styles}`}
    onClick={handleClick}
  >
    <img src={imgUrl} alt="Logo" />
  </div>
);

const MenuMobile = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [hoveredLink, setHoveredLink] = useState(null);
  const [leaveTimer, setLeaveTimer] = useState(null);

  useEffect(() => {
    return () => {
      if (leaveTimer) {
        clearTimeout(leaveTimer);
      }
    };
  }, [leaveTimer]);

  const handleMouseEnter = (linkName) => {
    if (leaveTimer) {
      clearTimeout(leaveTimer);
      setLeaveTimer(null);
    }
    setHoveredLink(linkName);
  };

  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setHoveredLink(null);
    }, 200);
    setLeaveTimer(timer);
  };

  const handleCampaignClick = () => {
    setIsActive("Campaigns");
    navigate("/campaigns-list");
  };

  const CAMPAIGN_LINK_NAME = "Campaigns";

  return (
    <div>
      <style>{`
        .icon-container {
          transition: transform 0.2s ease-in-out;
        }
        .icon-rotate {
          transform: rotate(180deg);
        }
      `}</style>
      {/* Background Blur */}
      <div className="fixed top-0 left-0 w-full backdrop-blur-2xl h-[55px] z-[9999]"></div>
      {/* Menu */}
      <div className="fixed  px-[20px] top-0 left-0 w-full border-b-[1px] border-opacity-10 border-white z-[9999]">
        <div className="flex justify-between items-center flex-row sticky max-w-[1900px] mx-auto h-[55px]">
          {/* Logo */}
          <div className="flex">
            <Link to="/" onClick={() => setIsActive(null)}>
              <Logo styles="h-full w-[80px] rounded-[0]" imgUrl={logo} />
            </Link>
            {/* Links */}
            <div className="flex flex-row justify-center items-center ml-4 gap-2 relative">
              {/* Campaigns Link */}
              <div
                className={`cursor-pointer transition-all duration-200 ease-in-out pl-2 pr-1 py-1 rounded ${
                  isActive === CAMPAIGN_LINK_NAME ||
                  hoveredLink === CAMPAIGN_LINK_NAME
                    ? "text-white bg-zinc-500 bg-opacity-20"
                    : "text-white bg-transparent"
                } hover:bg-white hover:bg-opacity-10`}
                onClick={handleCampaignClick}
                onMouseEnter={() => handleMouseEnter(CAMPAIGN_LINK_NAME)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center">
                  Campaigns
                  <div className={`ml-[3px] mt-[3px] icon-container ${hoveredLink === CAMPAIGN_LINK_NAME ? 'icon-rotate' : ''}`}>
                    <Icons color="rgb(180, 188, 208)" size="17" iconType="chevronDown" />
                  </div>
                </div>
              </div>

              {/* How It Works Link */}
              <Link
                to="/how-it-works"
                className={`cursor-pointer transition-all duration-200 ease-in-out px-2 py-1 rounded ${
                  isActive === "How It Works"
                    ? "text-white bg-zinc-500 bg-opacity-20"
                    : "text-white bg-transparent"
                } hover:bg-white hover:bg-opacity-10`}
                onClick={() => setIsActive("How It Works")}
              >
                How It Works
              </Link>

              {/* DIV HOVER CAMPAIGN */}
              {hoveredLink === CAMPAIGN_LINK_NAME && (
                <CampaignHoverMenu
                  handleMouseEnter={() => handleMouseEnter(CAMPAIGN_LINK_NAME)}
                  handleMouseLeave={handleMouseLeave}
                />
              )}
            </div>
          </div>
          {/* Connect Wallet */}
          <div>
            <ConnectWallet
              modalSize="wide"
              theme="dark"
              switchToActiveChain={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuMobile;
