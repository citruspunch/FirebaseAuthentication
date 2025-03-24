import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider"


import App from "./App.tsx";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
console.log("Rendering App...");
root.render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>
);
