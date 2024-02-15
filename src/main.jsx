import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { StateContextProvider } from "./context";
import App2 from "./App2";
import './index.css';




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
      <StateContextProvider>
        <App2 />
      </StateContextProvider>
    </Router>
)