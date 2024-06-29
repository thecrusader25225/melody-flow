import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Library from "./Library";
import { FaHeart } from "react-icons/fa6";
import { PiPlaylist } from "react-icons/pi";
import { BiLogIn } from "react-icons/bi";
import { useState } from "react";

function App() {
  const [page, setPage] = useState("Liked");

  // console.log("liked: " + seeAll["Liked"]);
  return (
    <>
      <div className="w-screen h-screen">
        <div className="fixed top-0 left-0  border-b border-black h-24 w-full shadow-xl bg-transparent backdrop-blur z-10 overflow-hidden toggle-visibility"></div>
        <div className="fixed flex flex-col justify-between top-0 left-0 h-full w-1/6 min-w-44 toggle-visibility pt-32 pb-32 p-4">
          <span className="flex flex-col justify-center text-white bg-white bg-opacity-10 p-2 font-bold font-mono rounded-2xl">
            <button
              className={`navButton ${
                page === "Liked" ? "bg-white bg-opacity-10" : ""
              }`}
              onClick={() => setPage("Liked")}
            >
              <FaHeart className="text-3xl pr-2" />
              <p>Liked Songs</p>
            </button>
            <div className="bg-white h-0.5 w-full"></div>
            <button
              className={`navButton ${
                page === "Playlist" ? "bg-white bg-opacity-10" : ""
              }`}
              onClick={() => setPage("Playlist")}
            >
              <PiPlaylist className=" text-3xl pr-2" />
              <p>Playlists</p>
            </button>
          </span>
          <span className="flex flex-col justify-center text-white bg-white bg-opacity-10 p-2 font-bold  font-mono rounded-2xl">
            <button className="navButton">
              <BiLogIn className="text-3xl pr-2" />
              <p>Sign in</p>
            </button>
          </span>
        </div>

        <div className="  w-full h-full ">
          <Home page={page} />
        </div>
      </div>
    </>
  );
}

export default App;
