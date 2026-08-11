/// <reference types="@types/spotify-web-playback-sdk" />

interface Window {
  onSpotifyWebPlaybackSDKReady: () => void;
  Spotify: typeof Spotify;
}
