import { useState, useEffect, useRef, useCallback } from "react";

const MY_PLAYLIST = "spotify:playlist:3FIX1b3fsmGfCkGJToMiLr";

export function useSpotifyPlayer(token: string | null) {
  const [player, setPlayer] = useState<any>(undefined);
  const [deviceId, setDeviceId] = useState("");
  const [track, setTrack] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffleState, setShuffleState] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "context" | "track">(
    "off"
  );
  const [isReady, setIsReady] = useState(false);

  const tokenRef = useRef(token);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  useEffect(() => {
    if (!tokenRef.current) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const p = new window.Spotify.Player({
        name: "Alessandra Dashboard",
        getOAuthToken: (cb: any) => cb(tokenRef.current),
        volume: 0.5,
      });

      p.addListener("ready", ({ device_id }: any) => {
        setDeviceId(device_id);
        setIsReady(true);
      });

      p.addListener("player_state_changed", (state: any) => {
        if (!state) return;
        setTrack(state.track_window.current_track.name);
        setIsPlaying(!state.paused);
        setShuffleState(state.shuffle);
        setRepeatMode(["off", "context", "track"][state.repeat_mode] as any);
      });

      p.connect();
      setPlayer(p);
    };
  }, []);

  const api = useCallback(
    async (endpoint: string, method = "PUT", body?: any) => {
      if (!deviceId) return;

      const separator = endpoint.includes("?") ? "&" : "?";
      const url = `https://api.spotify.com/v1/me/player/${endpoint}${separator}device_id=${deviceId}`;

      try {
        await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${tokenRef.current}`,
            "Content-Type": "application/json",
          },
          body: body ? JSON.stringify(body) : undefined,
        });
      } catch (err) {
        console.error("Spotify API Error:", err);
      }
    },
    [deviceId]
  );

  return {
    player,
    isReady,
    track,
    isPlaying,
    shuffleState,
    repeatMode,
    togglePlay: () => player?.togglePlay(),
    skipNext: () => player?.nextTrack(),
    skipPrev: () => player?.previousTrack(),
    startPlaylist: async () => {
      if (!deviceId) return;
      await api("play?device_id=" + deviceId, "PUT", {
        context_uri: MY_PLAYLIST,
      });
    },
    toggleShuffle: async () => {
      setShuffleState(!shuffleState);
      await api(`shuffle?state=${!shuffleState}`);
    },
    toggleRepeat: async () => {
      const next =
        repeatMode === "off"
          ? "context"
          : repeatMode === "context"
          ? "track"
          : "off";
      setRepeatMode(next);
      await api(`repeat?state=${next}`);
    },
  };
}
