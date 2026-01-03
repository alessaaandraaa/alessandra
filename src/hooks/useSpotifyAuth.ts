import { useState, useEffect } from "react";

export function useSpotifyAuth() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("spotify_token");
    if (stored) setToken(stored);

    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "SPOTIFY_LOGIN_SUCCESS") {
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
      if (!refresh_token) return;
      try {
        const res = await fetch(
          `https://spotify-backend-eight-pink.vercel.app/refresh_token?refresh_token=${refresh_token}`
        );
        const data = await res.json();
        if (data.access_token) {
          setToken(data.access_token);
          window.localStorage.setItem("spotify_token", data.access_token);
        } else {
          logout();
        }
      } catch {
        logout();
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
    const w = 450,
      h = 730;
    const env = window.location.hostname === "localhost" ? "dev" : "prod";
    window.open(
      `https://spotify-backend-eight-pink.vercel.app/login?env=${env}`,
      "Spotify",
      `width=${w},height=${h},left=${(screen.width - w) / 2},top=${
        (screen.height - h) / 2
      }`
    );
  };

  const logout = () => {
    setToken(null);
    window.localStorage.clear();
  };

  return { token, login };
}
