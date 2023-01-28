import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./Styles/styles.css";
import { ThemeProvider } from "@mui/material/styles";
import { responsiveTheme } from "./Theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={responsiveTheme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
