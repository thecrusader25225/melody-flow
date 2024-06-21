import { useRef, useState, useEffect } from "react";
import userLogo from "./userLogo.jpg";
import { FaMusic } from "react-icons/fa";
import Player from "./Player";

export default function Home() {
  const [addedSongs, setAddedSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1); // -1 means no song selected
  const [time, setTime] = useState("");
  const [seeAll, setSeeAll] = useState({
    Library: false,
    Liked: false,
    Playlist: false,
  });
  const [likedSongs, setLikedSongs] = useState([]);

  const addedSongsRef = useRef(null);

  const handleSongAdd = (song) => {
    const file = song.target.files[0];
    const url = URL.createObjectURL(file);
    setAddedSongs([...addedSongs, { url: url, name: file.name }]);
  };

  const handleClick = () => {
    addedSongsRef.current.click();
  };

  const handleSongClick = (index, type) => {
    let indexToFind = index;
    if (type == "Liked") {
      const song = likedSongs[index];
      indexToFind = addedSongs.findIndex((s) => song.url == s.url);
    }

    setCurrentSongIndex(indexToFind);
  };

  useEffect(() => {
    const date = new Date();
    const currentTime = date.getHours();
    if (currentTime >= 4 && currentTime < 12) setTime("Morning");
    else if (currentTime >= 12 && currentTime < 18) setTime("Afternoon");
    else setTime("Evening");
  }, []);

  function List({ type }) {
    return (
      <>
        {(type == "Library" ? addedSongs : likedSongs).map((song, index) => (
          <div
            key={index}
            className={`backdrop-blur-3xl m-2 ${
              seeAll[type]
                ? "flex-grow w-full h-16 border-b border-fuchsia-950 hover:scale-110 hover:bg-white hover:bg-opacity-5 hover:rounded-full duration-100"
                : "rounded-full w-32 h-32 hover:border-y border-purple-600 shadow-2xl hover:scale-125 duration-200"
            } hover:cursor-pointer transform transition-transform ease-linear flex flex-col flex-shrink-0 justify-center items-center`}
            onClick={() => handleSongClick(index, type)}
          >
            <p className="bg-gradient-to-r from-yellow-300 via-pink-500 to-fuchsia-800 bg-clip-text text-transparent">
              {song.name}
            </p>
            <FaMusic className="text-black" />
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="w-full h-full flex flex-row bg-gradient-to-tl from-slate-900 via-fuchsia-900 to-slate-900 adjustible-padding overflow-y-auto">
      <div className="w-[calc(60%)] h-full flex flex-col custom-text-color px-8 pt-8 z-0">
        <div className="w-full flex flex-col shadow-bottom rounded-3xl px-4 h-1/3">
          <div className="flex justify-between items-center w-full h-full">
            <span className="justify-center flex flex-col italic">
              <p className="font-extrabold font-mono adjustable-text-size">
                Good {time}, User
              </p>
              <p className="text-xl text-shadow">
                Get yourself some good music (:
              </p>
            </span>
            <img
              src={userLogo}
              alt="user pfp"
              className="adjustible-image-size rounded-tr-2xl m-2"
            />
          </div>
          <div className="border-t-2 p-2 flex justify-end text-fuchsia-200">
            <p>You might wanna add some music...</p>
            <button onClick={handleClick}>Enter</button>
            <input
              type="file"
              ref={addedSongsRef}
              accept="audio/*"
              onChange={handleSongAdd}
              className="hidden"
            />
          </div>
        </div>
        <div className="mt-8 mb-4 w-full h-auto flex flex-col flex-grow m-1 text-fuchsia-200">
          <span className="flex justify-between">
            <p className="font-bold font-mono ">Library</p>
            <button
              onClick={() => setSeeAll({ ...seeAll, Library: !seeAll.Library })}
            >
              See all
            </button>
          </span>
          {seeAll.Library ? (
            <div className=" w-full  flex flex-col flex-grow rounded-3xl backdrop-blur-xl shadow-md flex-wrap flex-shrink-0 m-1 p-8 pr-12">
              <List type="Library" />
            </div>
          ) : (
            <div className=" w-full h-full  flex items-center  overflow-x-auto overflow-y-hidden flex-none rounded-full backdrop-blur-xl shadow-md  ">
              <List type="Library" />
            </div>
          )}
        </div>
        <div className="mt-8 mb-4 w-full h-auto flex flex-col flex-grow m-1 text-fuchsia-200">
          <span className="flex justify-between">
            <p className="font-bold font-mono">Liked Songs</p>
            <button
              className=""
              onClick={() => setSeeAll({ ...seeAll, Liked: !seeAll.Liked })}
            >
              See all
            </button>
          </span>
          {seeAll.Liked ? (
            <div className=" w-full  flex flex-col flex-grow rounded-3xl backdrop-blur-xl shadow-md flex-wrap flex-shrink-0 m-1 p-8 pr-12">
              <List type="Liked" />
            </div>
          ) : (
            <div className=" w-full h-full  flex items-center  overflow-x-auto overflow-y-hidden flex-none rounded-full backdrop-blur-xl shadow-md  ">
              <List type="Liked" />
            </div>
          )}
        </div>
        <div className="mt-8 mb-4 w-full h-auto flex flex-col flex-grow m-1">
          <span className="flex justify-between">
            <p className="font-bold font-mono text-fuchsia-200">Playlist</p>
            <button
              className="text-fuchsia-200"
              onClick={() =>
                setSeeAll({ ...seeAll, Playlist: !seeAll.Playlist })
              }
            >
              See all
            </button>
          </span>
          {seeAll.Playlist ? (
            <div className=" w-full  flex flex-col flex-grow rounded-3xl backdrop-blur-xl shadow-md flex-wrap flex-shrink-0 m-1 p-8 pr-12">
              <List type="Playlist" />
            </div>
          ) : (
            <div className=" w-full h-full  flex items-center  overflow-x-auto overflow-y-hidden flex-none rounded-full backdrop-blur-xl shadow-md  ">
              <List type="Playlist" />
            </div>
          )}
        </div>
      </div>

      <div className="player w-[calc(40%)] h-full px-8 py-4 shadow-left fixed top-0 right-0 flex justify-center items-center flex-col">
        <Player
          songs={addedSongs}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          likedSongs={likedSongs}
          setLikedSongs={setLikedSongs}
        />
      </div>
    </div>
  );
}
