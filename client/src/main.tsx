import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import App from "./App";
import "./index.css";
import { initGA } from "./lib/analytics";

function AppWithAnalytics() {
  useEffect(() => {
    // Initialize Google Analytics when app loads
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return <App />;
}

createRoot(document.getElementById("root")!).render(<AppWithAnalytics />);
