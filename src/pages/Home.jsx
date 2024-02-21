import React from "react";
import { GlowingStarsBackgroundCardPreview } from "../components/GlowingCard";
import { Icons } from "../assets";
import { HeroScrollDemo } from "../components/Ipad";

const Home = () => {
  return (
    <div className="max-w-[1900px] mx-auto">
      <div className="absolute top-0 h-[50vh] bg-[radial-gradient(ellipse_80%_50%_at_50%_-17%,rgba(72,155,240,0.3),rgba(0,0,0,0))] w-full "></div>
      <div className="relative flex justify-center items-center  flex-col justify-between pl-[0px] max-w-[1900px] mx-auto">
        <GlowingStarsBackgroundCardPreview />

        {/* Approximating transparent to white with light gray to white gradient */}
        <div className="h-fit-content mt-[150px] flex flex-col justify-center items-center z-50">
          <div className="py-1 px-4 backdrop-blur-2xl border border-opacity-10 border-white rounded-full cursor-pointer bg-white bg-opacity-10 hover:bg-opacity-20">
            <p className="text-xs sm:text-sm">What is the concept</p>
          </div>
          <h1 className="text-3xl font-medium leading-tight mt-8 pb-[10px] text-center xs:text-4xl s:text-5xl sm:text-6xl md:text-7xl lg:text-[5rem]">
            Unleash the Future :<br/>
            Web3 Crowdfunding
          </h1>
          <h4 className="mt-[15px] max-w-[400px] sm:max-w-[630px] text-sm px-[20px] text-center text-base sm:text-base sm:text-xl lg:text-[22px]">
            Revolutionize how ideas get funded. Streamline backing, monitor
            
            developments, and foster innovation with ease.
          </h4>
          <div>
            <button class="flex items-center	text-white mt-8 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br dark:focus:ring-blue-800 font-medium rounded-xl text-xs sm:text-sm pl-5 pr-3 py-2.5 text-center me-2 mb-2">Participate in a project <div className="ml-[3px] pt-[2px]"><Icons  color="rgb(255, 255, 255)" size="17" iconType="chevronRight"/></div></button>
          </div>
        </div>

      </div>
      <HeroScrollDemo />
      <h1 className="text-center w-full mt-[-50px] mb-[1000px]">Discover new campaigns on a daily baisis</h1>

    </div>
  );
};

export default Home;
