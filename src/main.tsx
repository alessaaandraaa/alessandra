import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import QueryProvider from "./components/provider.tsx";
createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </QueryProvider>,
);
