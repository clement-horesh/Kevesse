import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../utils/cn";

// GlowingStarsBackgroundCard component with dynamic background stars
export const GlowingStarsBackgroundCard = ({ className, children }) => {
  return (
    <div className={cn("w-[100%] ", className)}>
      <div className="flex justify-center items-center">
        <Illustration />
      </div>
      <div>{children}</div>
    </div>
  );
};

// Illustration component responsible for rendering stars
export const Illustration = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth <= 768;

  const stars = isMobile ? 100 : 200; // 100 stars for mobile, 200 for larger screens
  const columns = isMobile ? 10 : 20; // 10 columns for mobile, 20 for larger screens

  const [glowingStars, setGlowingStars] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const highlightedStars = Array.from({ length: isMobile ? 15 : 30 }, () =>
        Math.floor(Math.random() * stars)
      );
      setGlowingStars([...highlightedStars]);
    }, isMobile ? 3000 : 2000);

    return () => clearInterval(interval);
  }, [isMobile, stars]);

  return (
    <div
      className="h-[50vh] w-full"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `1px`,
      }}
    >
      {[...Array(stars)].map((_, starIdx) => {
        const isGlowing = glowingStars.includes(starIdx);
        const delay = (starIdx % 10) * 0.1;
        return (
          <div
            key={`matrix-col-${starIdx}`}
            className="relative flex items-center justify-center"
          >
            <Star isGlowing={isGlowing} delay={delay} />
            <AnimatePresence mode="wait">
              {isGlowing && <Glow delay={delay} />}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

const Star = ({ isGlowing, delay }) => {
  return (
    <motion.div
      initial={{
        scale: 1,
      }}
      animate={{
        scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
        background: isGlowing ? "#fff" : "#666",
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      className="bg-[#666] h-[1.5px] w-[1.5px] rounded-full relative"
    ></motion.div>
  );
};

const Glow = ({ delay }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      exit={{
        opacity: 0,
      }}
      className="absolute left-1/2 -translate-x-1/2 h-[8px] w-[8px] rounded-full bg-blue-500 blur-[2px] shadow-2xl shadow-blue-400"
    />
  );
};

// GlowingStarsBackgroundCardPreview component to showcase the background
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
