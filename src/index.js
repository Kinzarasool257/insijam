import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initGA } from "./analytics/ga";
import "./index.css";   // GLOBAL CSS

initGA();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);