import React from 'react';
import MenuFull from './MenuFull';
import MenuMobile from "./MenuMobile";

// Custom hook to check viewport width
const useViewport = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width };
};

const Menu = () => {
  const { width } = useViewport();
  const breakpoint = 768; // Define your breakpoint for mobile devices

  return (
    <div>
      {width < breakpoint ? <MenuMobile /> : <MenuFull />}
    </div>
  );
};

export default Menu;
