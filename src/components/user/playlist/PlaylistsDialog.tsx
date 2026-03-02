import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import axios from "axios";
export default function PlaylistsDialog() {
  const [playlists, setPlaylists] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const accessToken = localStorage.getItem("spotify_token");
      console.log("ACCESS TOKEN: ", accessToken);
      const res = await axios.get(
        "https://spotify-backend-eight-pink.vercel.app/api/spotify/get_playlist",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Send token as Bearer token in header
          },
        },
      );
      console.log(res.data);

      setPlaylists(res.data.playlists);
    };

    fetchPlaylists();
  }, []);
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>My Playlists</CardTitle>
      </CardHeader>
      <CardContent>
        {playlists ? (
          playlists.map((playlist: any) => {
            return <p key={playlist.id}>{playlist.name}</p>;
          })
        ) : (
          <p>No playlists available</p>
        )}
      </CardContent>
    </Card>
  );
}
