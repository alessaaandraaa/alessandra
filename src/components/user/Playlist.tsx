import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";
import { useSpotifyPlayer } from "@/hooks/useSpotifyPlayer";

export default function Playlist() {
  const { token, login } = useSpotifyAuth();
  const {
    isReady,
    track,
    isPlaying,
    repeatMode,
    shuffleState,
    togglePlay,
    skipNext,
    skipPrev,
    toggleShuffle,
    toggleRepeat,
    startPlaylist,
  } = useSpotifyPlayer(token);

  if (!token) {
    return (
      <div className="p-10 flex justify-center items-center">
        <button
          onClick={login}
          className="bg-white text-black px-6 py-3 rounded-full font-bold"
        >
          Login to Spotify
        </button>
      </div>
    );
  }

  return (
    <div className="p-10 font-mono text-white select-none">
      <div className="bg-zinc-500/50 m-2 rounded-2xl backdrop-blur-md p-2 text-center text-xs font-bold">
        {track || "Ready to Play"}
      </div>

      <div className="flex gap-3 items-center justify-center">
        {!track ? (
          <button
            onClick={startPlaylist}
            disabled={!isReady}
            className={`px-6 py-2 rounded-full border border-white text-xs ${
              !isReady ? "opacity-50" : "hover:bg-white hover:text-black"
            }`}
          >
            {isReady ? "Start Playlist" : "Loading..."}
          </button>
        ) : (
          <>
            <ControlBtn onClick={skipPrev}>⏮</ControlBtn>
            <ControlBtn onClick={togglePlay} active={isPlaying}>
              {isPlaying ? "❚❚" : "▶"}
            </ControlBtn>
            <ControlBtn onClick={skipNext}>⏭</ControlBtn>

            <ControlBtn onClick={toggleRepeat}>
              {repeatMode === "off" ? (
                <span className="text-gray-400">×</span>
              ) : (
                <span className="text-green-500">
                  ⟳{repeatMode === "track" && "1"}
                </span>
              )}
            </ControlBtn>

            <ControlBtn onClick={toggleShuffle}>
              <span
                className={shuffleState ? "text-green-500" : "text-gray-500"}
              >
                ↳↰
              </span>
            </ControlBtn>
          </>
        )}
      </div>
    </div>
  );
}

const ControlBtn = ({ children, onClick, active }: any) => (
  <button
    onClick={onClick}
    className={`btn text-center ${active ? "text-green-400" : "text-white"}`}
  >
    {children}
  </button>
);
