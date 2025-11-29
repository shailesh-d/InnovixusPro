import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import App from "./App";
import "./index.css";
import { initGA } from "./lib/analytics";

function AppWithAnalytics() {
  useEffect(() => {
    initGA();
  }, []);

  return <App />;
}

createRoot(document.getElementById("root")!).render(<AppWithAnalytics />);
