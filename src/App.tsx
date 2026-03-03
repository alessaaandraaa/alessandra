import "./App.css";

import ToDo from "./components/user/todo/ToDo";
import Playlist from "./components/user/playlist/Playlist";
import ImgLinksMain from "./components/user/links/ImgLinksMain";
function App() {
  return (
    <div className="flex gap-5 cursor-pointer group select-none">
      <ToDo />
      <div className="bg-black/25 p-5 rounded-2xl min-w-2xl max-w-2xl">
        <ImgLinksMain />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
