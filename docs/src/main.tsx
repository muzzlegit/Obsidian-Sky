import { Boot } from "@client/app/Boot.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./client/app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Boot>
      <App />
    </Boot>
  </StrictMode>
);
