import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import WebFont from "webfontloader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import App from "./App";
WebFont.load({
  google: {
    families: ["Tenor Sans"],
  },
});
const POLLING_INTERVAL = 12000;

export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

const themeSettings = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#573FC8",
      light: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
    info: {
      main: "#A794FF",
    },
    background: { paper: "#16162A" },
  },
  typography: {
    allVariants: {
      color: "#ffffff",
    },
    fontFamily: `"Tenor Sans" , sans-serif`,
  },
});
const theme = responsiveFontSizes(themeSettings);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </Router>
      </Web3ReactProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
