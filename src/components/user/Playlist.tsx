import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();
const MY_PLAYLIST_URI = "spotify:playlist:6ydhtIJVFO0oHEljQfP8iT";

export default function Playlist() {
  // State
  const [token, setToken] = useState<string | null>(null);
  const [player, setPlayer] = useState<any>(undefined);
  const [deviceId, setDeviceId] = useState<string>("");

  // UI State
  const [track, setTrack] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatState, setRepeatState] = useState<"off" | "context" | "track">(
    "off"
  );
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    let _token = window.localStorage.getItem("spotify_token");

    if (!token && hash) {
      const urlToken = new URLSearchParams(hash.substring(1)).get(
        "access_token"
      );
      if (urlToken) {
        _token = urlToken;
        window.localStorage.setItem("spotify_token", urlToken);
        window.history.pushState({}, "", "/"); // Clean URL
      }
    }

    if (_token) {
      setToken(_token);
      spotify.setAccessToken(_token);
    }
  }, []);

  // 2. SETUP PLAYER (Directly in Browser)
  useEffect(() => {
    if (!token) return;

    // Inject SDK script
    if (!document.getElementById("spotify-player-script")) {
      const script = document.createElement("script");
      script.id = "spotify-player-script";
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      const newPlayer = new window.Spotify.Player({
        name: "Alessandra Dashboard",
        getOAuthToken: (cb: any) => cb(token),
        volume: 0.5,
      });

      newPlayer.addListener("ready", ({ device_id }: any) => {
        console.log("Device Ready:", device_id);
        setDeviceId(device_id);
        setIsPlayerReady(true);
      });

      newPlayer.addListener("player_state_changed", (state: any) => {
        if (!state) return;
        setTrack(state.track_window.current_track.name);
        setIsPlaying(!state.paused);
      });

      newPlayer.connect();
      setPlayer(newPlayer);
    };
  }, [token]);

  const handleTogglePlay = () => player?.togglePlay();
  const handleSkipNext = () => player?.nextTrack();
  const handleSkipPrev = () => player?.previousTrack();

  const handleRepeat = () => {
    let nextState: "off" | "context" | "track" = "off";
    if (repeatState === "off") nextState = "context";
    else if (repeatState === "context") nextState = "track";
    else nextState = "off";

    setRepeatState(nextState);
    spotify.setRepeat(nextState);
  };

  const playMyPlaylist = () => {
    if (!deviceId) return;

    spotify
      .transferMyPlayback([deviceId], { play: false })
      .then(() => new Promise((resolve) => setTimeout(resolve, 500)))
      .then(() =>
        spotify.play({ context_uri: MY_PLAYLIST_URI, device_id: deviceId })
      )
      .catch((err) => console.error("Playback error:", err));
  };

  const handleLogin = () => {
    window.location.href =
      "https://spotify-backend-eight-pink.vercel.app/login";
  };

  return (
    <div className="p-10 cursor-pointer group select-none flex items-center justify-center font-sans text-white">
      {!token ? (
        <button
          onClick={handleLogin}
          className="bg-green-500 text-black px-6 py-3 rounded-full font-bold"
        >
          Login to Spotify
        </button>
      ) : (
        <div>
          {/* Track Info */}
          <div className="bg-zinc-500/50 m-2 rounded-2xl backdrop-blur-md">
            <p className="text-white p-4 font-bold text-center">
              {track || "Ready to Play"}
            </p>
          </div>

          <div className="flex gap-3 items-center justify-center bg-black/40 p-3 rounded-full">
            {/* Start Button vs Controls */}
            {!track ? (
              <button
                onClick={playMyPlaylist}
                disabled={!isPlayerReady}
                className={`px-6 py-2 rounded-full border border-white hover:bg-white hover:text-black transition ${
                  !isPlayerReady && "opacity-50 cursor-wait"
                }`}
              >
                {isPlayerReady ? "Start Playlist" : "Loading..."}
              </button>
            ) : (
              <div className="flex gap-2 items-center">
                {/* PREV */}
                <button
                  onClick={handleSkipPrev}
                  className="btn p-2 hover:text-green-400"
                >
                  ⏮
                </button>

                {/* PLAY/PAUSE */}
                <button
                  onClick={handleTogglePlay}
                  className={`px-4 py-1 rounded text-black font-bold transition ${
                    isPlaying ? "bg-green-400" : "bg-white"
                  }`}
                >
                  {isPlaying ? "❚❚" : "▶"}
                </button>

                {/* NEXT */}
                <button
                  onClick={handleSkipNext}
                  className="btn p-2 hover:text-green-400"
                >
                  ⏭
                </button>

                {/* REPEAT (Your Logic) */}
                <button
                  onClick={handleRepeat}
                  className="btn text-xl w-8 text-center"
                >
                  {repeatState === "off" && (
                    <span className="text-gray-400">×</span>
                  )}
                  {repeatState === "context" && (
                    <span className="text-green-500">⟳</span>
                  )}
                  {repeatState === "track" && (
                    <span className="text-green-500 relative">
                      ⟳
                      <span className="absolute text-[8px] top-1 right-0 font-bold">
                        1
                      </span>
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
