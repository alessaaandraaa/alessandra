import "./App.css";
import ImgLinks from "./components/user/ImgLinks";
import Playlist from "./components/user/Playlist";
function App() {
  return (
    <div className="flex gap-10 cursor-pointer group select-none">
      <div className="bg-black/25 p-5 rounded-2xl">
        <p className="text-white font-bold text-2xl">TO-DO</p>
      </div>
      <div className="bg-black/25 p-5 rounded-2xl">
        {" "}
        <ImgLinks />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
