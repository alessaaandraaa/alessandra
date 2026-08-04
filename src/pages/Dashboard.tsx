import "../App.css";
import ToDo from "@/components/user/todo/ToDo";
import Playlist from "@/components/user/playlist/Playlist";
import ImgLinksMain from "@/components/user/links/ImgLinksMain";
import { authClient } from "@/lib/auth-client";

export default function Dashboard() {
  const { isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-5 cursor-pointer group select-none justify-center w-full">
      <ToDo />
      <div className="bg-black/25 p-5 rounded-2xl min-w-2xl max-w-2xl">
        <ImgLinksMain />
        <Playlist />
      </div>
    </div>
  );
}
