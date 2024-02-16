import React from "react";
import {
  GlowingStarsBackgroundCard,
} from "./GlowingStarsBackgroundCard";

export function GlowingStarsBackgroundCardPreview() {
  return (
    <div className="absolute w-full max-w-[1900px]">
      <div className=" mt-[56px] items-center justify-center antialiased">
        <GlowingStarsBackgroundCard className="w-full"></GlowingStarsBackgroundCard>
      </div>
      <div className="absolute bottom-0 w-full h-[200px] bg-gradient-to-b from-transparent to-zinc-900"></div>
    </div>
  );
}
