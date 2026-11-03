import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.jsx";
import { StoreProvider } from "./context/StoreContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <App />
        <Toaster position="top-right" />
        <Analytics />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
