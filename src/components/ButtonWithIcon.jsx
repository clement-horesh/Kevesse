import React from 'react';

// Define the SVG as a React component
const ArrowUpDownIcon = () => (
  <svg width="22px" height="22px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
    <path d="M17 8L12 3L7 8" stroke="#e1e1e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M17 16L12 21L7 16" stroke="#e1e1e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

// More icons can be defined in a similar way

const ButtonWithIcon = ({ text, iconType, onClick }) => {
  // Function to determine which icon to render
  const renderIcon = () => {
    switch (iconType) {
      case 'arrowUpDown':
        return <ArrowUpDownIcon />;
      // Add cases for other icons here
      default:
        return null; // No icon if not specified or unrecognized type
    }
  };

  const icon = renderIcon();

  return (
    <button 
      className={`bg-zinc-700 font-Inter font-light text-[#e1e1e1] text-[14px] rounded-[12px] py-[11px] flex items-center gap-1 hover:bg-zinc-600 transition duration-200 ease-in-out ${
        icon ? 'pl-[18px] pr-[11px]' : 'px-[18px]'
      }`}
      onClick={onClick} // Attach the onClick event
    >
      {text}
      {icon}
    </button>
  );
};

export default ButtonWithIcon;
