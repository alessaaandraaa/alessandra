import { useEffect, useRef, useState } from "react";

const CHANNEL = "alessandra_dashboard_sync";

export function useSingleTab() {
  const [isBlocked, setIsBlocked] = useState(false);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const isLeaderRef = useRef(false);

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL);
    channelRef.current = channel;

    channel.postMessage({ type: "WHO_IS_LEADER" });

    const leaderTimeout = setTimeout(() => {
      isLeaderRef.current = true;
      setIsBlocked(false);
      channel.postMessage({ type: "LEADER" });
    }, 300);

    channel.onmessage = (event) => {
      if (event.data.type === "LEADER") {
        clearTimeout(leaderTimeout);
        setIsBlocked(true);
      }

      if (event.data.type === "WHO_IS_LEADER" && isLeaderRef.current) {
        channel.postMessage({ type: "LEADER" });
      }
    };

    return () => {
      clearTimeout(leaderTimeout);
      channel.close();
    };
  }, []);

  return { isBlocked };
}
