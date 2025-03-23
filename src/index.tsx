import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
console.log("Rendering App...");
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
