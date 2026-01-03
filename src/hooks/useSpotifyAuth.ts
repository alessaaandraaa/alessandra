import { useState, useEffect } from "react";

export function useSpotifyAuth() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // 1. Initial Load
    const stored = window.localStorage.getItem("spotify_token");
    if (stored) setToken(stored);

    // 2. Listen for Popup Success
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "SPOTIFY_LOGIN_SUCCESS") {
        console.log("Popup login success!", e.data);
        setToken(e.data.access_token);
        window.localStorage.setItem("spotify_token", e.data.access_token);
        window.localStorage.setItem(
          "spotify_refresh_token",
          e.data.refresh_token
        );
      }
    };
    window.addEventListener("message", handleMessage);

    const refresh = async () => {
      const refresh_token = window.localStorage.getItem(
        "spotify_refresh_token"
      );

      if (!refresh_token || refresh_token === "undefined") {
        return;
      }

      try {
        console.log("Attempting to refresh token...");
        const res = await fetch(
          `https://spotify-backend-eight-pink.vercel.app/refresh_token?refresh_token=${refresh_token}`
        );

        if (!res.ok) {
          console.error("Refresh failed: Backend rejected token. Logging out.");
          logout();
          return;
        }

        const data = await res.json();

        if (data.access_token) {
          console.log("Token refreshed successfully!");
          setToken(data.access_token);
          window.localStorage.setItem("spotify_token", data.access_token);

          if (data.refresh_token) {
            console.log("Saving rotated refresh token...");
            window.localStorage.setItem(
              "spotify_refresh_token",
              data.refresh_token
            );
          }
        } else {
          console.error("Refresh response missing access_token", data);
          logout();
        }
      } catch (err) {
        console.error("Auto-refresh network error:", err);
      }
    };

    refresh();
    const interval = setInterval(refresh, 50 * 60 * 1000);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearInterval(interval);
    };
  }, []);

  const login = () => {
    const width = 450;
    const height = 730;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const env = window.location.hostname === "localhost" ? "dev" : "prod";
    const url = `https://spotify-backend-eight-pink.vercel.app/login?env=${env}`;

    window.open(
      url,
      "_blank",
      `width=${width},height=${height},top=${top},left=${left},toolbar=no,menubar=no,location=no,status=no`
    );
  };

  const logout = () => {
    console.log("Logging out...");
    setToken(null);
    window.localStorage.clear();
  };

  return { token, login };
}
