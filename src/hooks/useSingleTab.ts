import { useState, useEffect } from "react";

export function useSingleTab() {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const channel = new BroadcastChannel("alessandra_dashboard_sync");

    channel.postMessage({ type: "NEW_TAB" });

    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 200);

    channel.onmessage = (event) => {
      if (event.data.type === "ACTIVE") {
        console.log("Another tab is active. Blocking this one.");
        setIsBlocked(true);
        setIsChecking(false);
        clearTimeout(timer);
      }

      if (event.data.type === "NEW_TAB") {
        if (!isBlocked && !isChecking) {
          channel.postMessage({ type: "ACTIVE" });
        }
      }
    };

    return () => {
      channel.close();
      clearTimeout(timer);
    };
  }, [isBlocked, isChecking]);

  return { isBlocked, isChecking };
}
