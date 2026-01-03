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
    const width = 450;
    const height = 730;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const env = window.location.hostname === "localhost" ? "dev" : "prod";
    const url = `https://spotify-backend-eight-pink.vercel.app/login?env=${env}`;

    // ✅ FORCE POPUP: Use "_blank" and ensure string conversion
    window.open(
      url,
      "_blank", // Forces a new window/tab
      `width=${width},height=${height},top=${top},left=${left},toolbar=no,menubar=no,location=no,status=no`
    );
  };

  const logout = () => {
    setToken(null);
    window.localStorage.clear();
  };

  return { token, login };
}
