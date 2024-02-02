import React from "react";

const Home = () => {
  return (
    <div className="relative mt-[80px] flex justify-center items-center lg:flex-col lg:justify-between  lg:pl-[0px] max-w-[1200px] mx-auto ">
      <p className="font-bold text-[30px] md:text-[70px] lg:text-[80px] w-[1200px] leading-[0.95] tracking-custom text-left">
        <span className="text-[#4e38f3]">Funding future,</span> blockchain
        <br />
        meets a test crowdfunding.
      </p>

      <div className="flex flex-row justify-between items-start mt-10 text-[#373D3F] text-left w-[1200px] mx-auto">
        <p className="w-1/2 pr-4">
          Our platform uniquely blends the power of blockchain technology with
          the dynamic world of crowdfunding. Here, investors and innovators
          unite, forging a new path in financing. Dive into a seamless
          experience where security meets opportunity. Your journey towards
          reshaping the investment landscape begins here.
        </p>
        <p className="w-1/2 pl-4">
          Our platform is designed to connect visionary projects with
          forward-thinking investors. Experience the synergy of decentralized
          finance and collective backing. Together, we're not just funding
          projects, we're building futures.
        </p>
      </div>
    </div>
  );
};

export default Home;
