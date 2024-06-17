import { useRef, useState, useEffect } from "react";
import userLogo from "./userLogo.jpg";
import { FaMusic } from "react-icons/fa";
import Player from "./Player";

export default function Home() {
  const [addedSongs, setAddedSongs] = useState([]);
  const [audioPlayer, setAudioPlayer] = useState("");
  const [currentSong, setCurrentSong] = useState("");
  const [time, setTime] = useState("");
  const [seeAll, setSeeAll] = useState(false);

  const addedSongsRef = useRef(null);

  const handleSongAdd = (song) => {
    const file = song.target.files[0];
    const url = URL.createObjectURL(file);
    // const audio = new Audio(URL.createObjectURL(file));
    setAddedSongs([...addedSongs, { url: url, name: file.name }]);

    //console.log(audio);
  };
  function handleClick() {
    addedSongsRef.current.click();
  }

  console.log(addedSongs);

  let date = new Date();

  //getting the current time when the page is rendered
  useEffect(() => {
    let currentTime = date.getHours();
    if (currentTime >= 4 && currentTime < 12) setTime("Morning");
    else if (currentTime >= 12 && currentTime < 18) setTime("Afternoon");
    else setTime("Evening");
  }, []);

  function Library() {
    console.log("See all: " + seeAll);
    return (
      <>
        {addedSongs.map((song) => {
          return (
            <div
              className={` backdrop-blur-3xl w-32 h-32  m-2 ${
                seeAll ? "flex-grow w-full" : "rounded-full"
              } hover:scale-125 hover:cursor-pointer transform transition-transform duration-200 ease-linear flex flex-col flex-shrink-0 justify-center items-center shadow-2xl hover:border-y border-purple-600  `}
              onClick={() =>
                setCurrentSong({
                  url: `${song.url}`,
                  name: `${song.name}`,
                })
              }
            >
              <p className=" bg-gradient-to-r from-yellow-300 via-pink-500 to-fuchsia-800 bg-clip-text text-transparent ">
                {song.name}
              </p>
              <FaMusic className="text-black" />
            </div>
          );
        })}
      </>
    );
  }

  return (
    <>
      <div className="w-full h-full flex flex-row bg-gradient-to-tl from-slate-900 via-fuchsia-900 to-slate-900 adjustible-padding  overflow-y-auto ">
        <div className="w-[calc(75%)] h-full flex flex-col bg-gradient-to-r from-violet-400 via-fuchsia-100 to-purple-400 bg-clip-text text-transparent px-8 pt-8 z-0">
          <div className="w-full flex flex-col shadow-bottom rounded-3xl px-4 h-1/3">
            <div className="flex justify-between items-center  w-full h-full ">
              <span className=" justify-center  flex flex-col  italic ">
                <p className="font-extrabold font-mono adjustable-text-size ">
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
            <div className="border-t-2 p-2 flex justify-end">
              <p className=" ">You might wanna add some music...</p>
              <button onClick={handleClick}>Enter</button>
              <input
                type="file"
                ref={addedSongsRef}
                accept="audio/*"
                onChange={handleSongAdd}
                className=" hidden"
              />
            </div>
          </div>
          <div className="p-4 mt-8 mb-4 w-full h-auto flex flex-col  flex-grow m-1 ">
            <span className="flex justify-between">
              <p className=" font-bold font-mono">Library</p>
              <button onClick={() => setSeeAll(!seeAll)}>See all</button>
            </span>
            {/**library section */}
            {seeAll ? (
              <div className=" w-full  flex flex-col flex-grow rounded-3xl backdrop-blur-xl shadow-md flex-wrap flex-shrink-0 m-1 ">
                <Library />
              </div>
            ) : (
              <div className=" w-full h-full  flex items-center  overflow-x-auto overflow-y-hidden flex-none rounded-full backdrop-blur-xl shadow-md  ">
                <Library />
              </div>
            )}
          </div>
          {/** */}
          <div className="p-4 mt-8 mb-4 w-full h-auto flex flex-col flex-grow m-1 ">
            <span className="flex justify-between">
              <p className=" font-bold font-mono">Playlist</p>
              <button onClick={() => setSeeAll(!seeAll)}>See all</button>
            </span>
            {/**library section */}
            {seeAll ? (
              <div className=" w-full  flex items-center  overflow-x-hidden flex-grow rounded-full backdrop-blur-xl shadow-md flex-wrap flex-shrink-0 m-1 ">
                <Library />
              </div>
            ) : (
              <div className=" w-full h-full  flex items-center  overflow-x-auto overflow-y-hidden flex-none rounded-full backdrop-blur-xl shadow-md  ">
                <Library />
              </div>
            )}
          </div>
        </div>

        <div className="player w-[calc(25%)] h-full px-8 py-4 shadow-left fixed top-0 right-0">
          <Player song={currentSong} />
          {console.log("Current" + currentSong.url)}
        </div>
      </div>
    </>
  );
}
