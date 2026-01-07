import { useState, useEffect } from "react";

export function useSingleTab() {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const channel = new BroadcastChannel("alessandra");
    channel.postMessage({ type: "NEW_TAB" });

    channel.onmessage = (event) => {
      if (event.data.type === "ACTIVE") {
        console.log("Another tab is active. Blocking this one.");
        setIsBlocked(true);
      }

      if (event.data.type === "NEW_TAB") {
        if (!isBlocked) {
          channel.postMessage({ type: "ACTIVE" });
        }
      }
    };

    return () => {
      channel.close();
    };
  }, [isBlocked]);

  return isBlocked;
}
