import { useRef, useState, useEffect } from "react";
import userLogo from "./userLogo.jpg";
import { FaMusic } from "react-icons/fa";
import Player from "./Player";

export default function Home() {
  const [addedSongs, setAddedSongs] = useState([]);
  const [audioPlayer, setAudioPlayer] = useState("");
  const [currentSong, setCurrentSong] = useState("");
  const [time, setTime] = useState("");

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

  return (
    <>
      <div className="w-full h-full flex flex-row bg-gradient-to-tl from-slate-900 via-fuchsia-900 to-slate-900 adjustible-padding ">
        <div className="w-3/4 h-full flex flex-col bg-gradient-to-r from-violet-400 via-fuchsia-100 to-purple-400 bg-clip-text text-transparent  px-8 py-4">
          <div className="w-full h-1/2 flex flex-col shadow-bottom rounded-3xl px-4">
            <div className="flex justify-between items-center  w-full h-full ">
              <span className=" justify-center pr-0 flex flex-col  italic ">
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
                className="adjustible-image-size rounded-tr-2xl"
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
          <div className="p-4 mt-8 mb-4 w-full h-1/4 flex flex-col rounded-b-full">
            <span className="flex justify-between">
              <p className=" font-bold font-mono">Library</p>
              {/* <Link to={{ pathname: "/library", state: { addedSongs } }}> */}
              <button onClick={"#"}>See all</button>
            </span>
            <div className=" w-full h-full  flex items-center  overflow-x-auto overflow-y-hidden flex-none rounded-full backdrop-blur-xl shadow-md  ">
              {addedSongs.map((song) => {
                return (
                  <div
                    className=" backdrop-blur-3xl w-32 h-32 flex-shrink-0 m-2 rounded-full hover:scale-125 hover:cursor-pointer transform transition-transform duration-200 ease-linear flex flex-col justify-center items-center shadow-2xl hover:border-y border-purple-600 "
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
            </div>
          </div>
          <div className=" w-full h-1/4  flex items-center p-4 mb-8 bt-4 overflow-x-auto overflow-y-hidden flex-none rounded-full backdrop-blur-xl shadow-md">
            {addedSongs.map((song) => {
              return (
                <div className=" backdrop-blur-3xl w-32 h-32 m-2 rounded-full hover:scale-150 hover:cursor-pointer transform transition-transform duration-200 ease-linear flex flex-col justify-center items-center shadow-2xl">
                  {/* <p className=" bg-gradient-to-r from-yellow-300 via-pink-500 to-fuchsia-800 bg-clip-text text-transparent ">
                    {song.name}
                  </p> */}
                  <FaMusic className="text-black w-full" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="player w-1/3 h-full px-8 py-4 shadow-left">
          <Player song={currentSong} />
          {console.log("Current" + currentSong.url)}
        </div>
      </div>
    </>
  );
}
