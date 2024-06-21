import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Library from "./Library";
import { FaHeart } from "react-icons/fa6";
import { PiPlaylist } from "react-icons/pi";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="w-screen h-screen">
          <div className="fixed top-0 left-0  border-b border-black h-24 w-full shadow-xl bg-transparent backdrop-blur z-10 overflow-hidden toggle-visibility"></div>
          <div className="fixed top-0 left-0 h-full w-1/6 min-w-44 toggle-visibility pt-32 p-4">
            <span className="flex flex-col justify-center text-white bg-white bg-opacity-10 p-2 font-bold italic font-mono rounded-2xl">
              <button className="flex p-2 my-2 hover:bg-white hover:bg-opacity-10 rounded-full duration-200 ">
                <FaHeart className="text-3xl pr-2" />
                <p>Liked Songs</p>
              </button>
              <div className="bg-white h-0.5 w-full"></div>
              <button className="flex p-2 my-2 hover:bg-white hover:bg-opacity-10 rounded-full duration-200 ">
                <PiPlaylist className=" text-3xl pr-2" />
                <p>Playlists</p>
              </button>
            </span>
          </div>

          <div className="  w-full h-full ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/library" element={<Library />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
