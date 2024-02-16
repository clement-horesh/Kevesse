import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../../assets";
import { Icons } from "../../assets";

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
  const [isActive, setIsActive] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <style>{`
        .menu-full-screen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.9);
          z-index: 999;
          display: flex;
          flex-direction: column;
          justify-content: start;
          align-items: flex-start;
          padding-top: 20px;
          transform: ${isMenuOpen ? "translateY(0)" : "translateY(-100%)"};
          transition: transform 0.3s ease;
        }
        .icon-container {
          transition: transform 0.2s ease-in-out;
        }
      `}</style>
      {/* Background Blur */}
      <div className="fixed top-0 left-0 w-full backdrop-blur-2xl h-[55px] z-[9998]"></div>
      {/* Menu */}
      <div className="fixed px-[20px] top-0 left-0 w-full border-b-[1px] border-opacity-10 border-white z-[9999]">
        <div className="flex justify-between items-center flex-row sticky max-w-[1900px] mx-auto h-[55px]">
          {/* Logo */}
          <Link to="/" onClick={() => setIsActive(null)}>
            <Logo styles="h-full w-[80px] rounded-[0]" imgUrl={logo} />
          </Link>
          {/* Hamburger Icon - Change to gamepad when menu is open */}
          <div
            className="flex items-center justify-end cursor-pointer z-[99]"
            onClick={toggleMenu}
          >
            <Icons iconType={isMenuOpen ? "gamepad" : "All"} size="24" color="white" />
          </div>
        </div>
      </div>
      {/* Full Screen Menu */}
      <div className={`menu-full-screen ${isMenuOpen ? "" : "hidden"}`}>
        {/* Close Icon - Also set to gamepad for consistency when menu is open */}
        <div className="fixed px-[20px] top-0 left-0 w-full border-b-[1px] border-opacity-10 border-white z-[9997]">
          <div className="flex justify-between items-center flex-row sticky max-w-[1900px] mx-auto h-[55px]">
            <Icons iconType="gamepad" size="24" color="white" />
          </div>
        </div>
        <div className="mt-[50px] flex flex-col">
          {/* Links */}
          <Link
            to="/"
            className="px-[20px] py-[10px] text-white"
            onClick={() => {
              setIsMenuOpen(false);
              setIsActive(null);
            }}
          >
            Home
          </Link>
          <Link
            to="/campaigns-list"
            className="px-[20px] py-[10px] text-white"
            onClick={() => {
              setIsMenuOpen(false);
              setIsActive("Campaigns");
            }}
          >
            Campaigns
          </Link>
          <Link
            to="/how-it-works"
            className="px-[20px] py-[10px] text-white"
            onClick={() => {
              setIsMenuOpen(false);
              setIsActive("How It Works");
            }}
          >
            How It Works
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuMobile;
