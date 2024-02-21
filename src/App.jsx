import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CampaignDetails, CreateCampaign, CampaignsList, Home, Profile } from './pages';
import { Menu } from './components';
import { BrowserRouter as Router } from 'react-router-dom';
import { StateContextProvider } from "./context";
import './index.css';


const MainComponent = () => {
  const location = useLocation();

  return (
    <div className="relative sm:-8 bg-[#060917] min-h-screen flex flex-row">
      <div className="flex-1 w-full mx-auto">
        {location.pathname !== "/create-campaign" && <Menu />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaigns-list" element={<CampaignsList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <StateContextProvider>
        <MainComponent />
      </StateContextProvider>
    </Router>
  );
}

export default App;
