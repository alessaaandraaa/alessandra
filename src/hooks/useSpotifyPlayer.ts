import { useState, useEffect } from "react";

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

  useEffect(() => {
    if (!token) return;
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const p = new window.Spotify.Player({
        name: "Alessandra Dashboard",
        getOAuthToken: (cb: any) => cb(token),
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
  }, [token]);

  const api = (url: string, method = "PUT", body?: any) =>
    fetch(`https://api.spotify.com/v1/me/player/${url}`, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: body ? JSON.stringify(body) : undefined,
    });

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
