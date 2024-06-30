import Home from "./Home";
import { FaHeart } from "react-icons/fa6";
import { PiPlaylist, PiSelectionBackgroundBold } from "react-icons/pi";
import { BiLogIn, BiSearch } from "react-icons/bi";
import { useState } from "react";
import logo from "./firstThemeLogo.png";
import { BsGithub } from "react-icons/bs";

function App() {
  const [page, setPage] = useState("Liked");
  const [themes, setThemes] = useState(0);
  // console.log("liked: " + seeAll["Liked"]);
  return (
    <>
      <div className="w-screen h-screen text-white">
        {/* top nav bar */}
        <div className="fixed flex justify-between items-center p-4 top-0 left-0 h-24 w-full shadow-lg bg-transparent backdrop-blur z-10 overflow-hidden toggle-visibility">
          <span className="flex items-center">
            <img src={logo} alt="Logo" className="w-20" />
            <p className="text-4xl font-mono font">Melody Flow</p>
          </span>
          <span className="flex items-center ">
            <PiSelectionBackgroundBold
              className="checkmark text-3xl"
              onClick={() => {
                setThemes(themes < 2 ? themes + 1 : 0);
              }}
            />
            <a
              href="https://github.com/thecrusader25225"
              target="_blank"
              rel="noreferrer"
            >
              <BsGithub className="checkmark text-3xl" />
            </a>
          </span>
        </div>

        {/* left nav bar */}
        <div className="fixed flex flex-col justify-between top-0 left-0 h-full w-1/6 min-w-44 toggle-visibility pt-32 pb-32 p-4">
          <span className="flex flex-col justify-center  bg-white bg-opacity-10 p-2 font-bold font-mono rounded-2xl">
            <button
              className={`navButton ${
                page === "Liked" && "bg-white bg-opacity-10"
              }`}
              onClick={() => setPage("Liked")}
            >
              <FaHeart className="text-3xl pr-2" />
              <p>Liked Songs</p>
            </button>
            <div className="bg-white h-0.5 w-full" />
            <button
              className={`navButton ${
                page === "Playlist" && "bg-white bg-opacity-10"
              }`}
              onClick={() => setPage("Playlist")}
            >
              <PiPlaylist className=" text-3xl pr-2" />
              <p>Playlists</p>
            </button>
            <div className="bg-white h-0.5 w-full" />
            <button className="navButton">
              <BiSearch className="text-3xl pr-2" />
              <p>Search</p>
            </button>
          </span>
          <span className="flex flex-col justify-center  bg-white bg-opacity-10 p-2 font-bold  font-mono rounded-2xl">
            <button className="navButton">
              <BiLogIn className="text-3xl pr-2" />
              <p>Sign in</p>
            </button>
          </span>
        </div>

        <div className="  w-full h-full ">
          <Home page={page} themes={themes} />
        </div>
      </div>
    </>
  );
}

export default App;
