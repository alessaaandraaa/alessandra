import "../App.css";
import ToDo from "@/components/user/todo/ToDo";
import Playlist from "@/components/user/playlist/Playlist";
import ImgLinksMain from "@/components/user/links/ImgLinksMain";
import { authClient } from "@/lib/auth-client";
import { Link } from "react-router-dom";
import MainPanel from "@/components/MainPanel";

export default function Dashboard() {
  const { isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Link
        to="/login"
        className="absolute top-0 right-0 text-white text-xs bg-black/50 rounded-xl px-3 py-2"
      >
        Login
      </Link>
      <MainPanel />
    </>
  );
}
