import React from "react";

const Box = ({ children, title }) => {
  return (
    <div className="bg-zinc-800 box-border border-[1px] border-opacity-10 border-white h-full w-full py-5 px-7 flex flex-col rounded-lg">
      <div className="mb-5 flex justify-between items-center">
        <h4 className="font-Inter font-light text-gray-300 text-m">{title}</h4>
      </div>
      <div className="flex-grow overflow-auto">{children}</div>
    </div>
  );
};

export default Box;
