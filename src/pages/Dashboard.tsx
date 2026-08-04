import "../App.css";
import ToDo from "@/components/user/todo/ToDo";
import Playlist from "@/components/user/playlist/Playlist";
import ImgLinksMain from "@/components/user/links/ImgLinksMain";
import { authClient } from "@/lib/auth-client";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex gap-5 cursor-pointer group select-none justify-center w-full">
      <Link
        to="/login"
        className="absolute top-0 right-0 text-white text-xs bg-black/50 rounded-xl px-3 py-2"
      >
        Login
      </Link>
      <ToDo />
      <div className="bg-black/25 p-5 rounded-2xl min-w-2xl max-w-2xl">
        <ImgLinksMain />
        <Playlist />
      </div>
    </div>
  );
}
