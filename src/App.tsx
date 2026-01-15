import "./App.css";
import ImgLinks from "./components/user/ImgLinks";
import ToDo from "./components/user/ToDo";
import Playlist from "./components/user/Playlist";
function App() {
  return (
    <div className="flex gap-10 cursor-pointer group select-none">
      <ToDo />
      <div className="bg-black/25 p-5 rounded-2xl">
        {" "}
        <ImgLinks />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
