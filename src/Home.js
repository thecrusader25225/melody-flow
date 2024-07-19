import { useRef, useState, useEffect } from "react";
import userLogo from "./userLogo.jpg";
import "./index.css";
import Player from "./Player";
import { CgClose, CgPlayList } from "react-icons/cg";
import { TiTick } from "react-icons/ti";
import {
  BiLeftArrow,
  BiPlay,
  BiRightArrow,
  BiSolidLeftArrow,
  BiSolidRightArrow,
} from "react-icons/bi";
import {
  MdArrowBack,
  MdArrowCircleUp,
  MdExpandCircleDown,
} from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";

export default function Home({ page, themes }) {
  const [addedSongs, setAddedSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // -1 means no song selected
  const [time, setTime] = useState("");

  const [likedSongs, setLikedSongs] = useState([]);
  const addedSongsRef = useRef(null);

  const [playlists, setPlaylists] = useState([]); //to keep track of playlist names
  const [playlistSongs, setPlaylistSongs] = useState([]); //to keep track of all songs in different playlists

  const [isWriting, setIsWriting] = useState(false); //to keep track of whether i am writing playlist name or not
  const [playlistName, setPlaylistName] = useState(""); //to keep track of the input box to type playlist name
  const [openPlaylist, setOpenPlaylist] = useState(false); //to keep track of whether a playlist is opened or not
  const [playlistIndex, setPlaylistIndex] = useState(null); //to keep track of indexes of playlist
  const [selectSongs, setSelectSongs] = useState(false); //to keep track of which song is selected to add to playlist
  const [volume, setVolume] = useState(100); //to keep track of volume
  const [seeAll, setSeeAll] = useState({
    Library: true,
    Liked: true,
    Playlist: true,
    Recent: false,
  });
  const [truncateLength, setTruncateLength] = useState(10); //smallest truncate length is 10 chars
  useEffect(() => {
    const updateTruncateLength = () => {
      if (window.innerWidth <= 640) setTruncateLength(5); //sm
      else if (window.innerWidth <= 768) setTruncateLength(5); //md
      else if (window.innerWidth <= 1024) setTruncateLength(10); //lg
      else if (window.innerWidth <= 1280) setTruncateLength(20); //xl
      else if (window.innerWidth <= 1536) setTruncateLength(30); //2xl
      else setTruncateLength(40); //max is 40 chars
    };
    updateTruncateLength();
    window.addEventListener("resize", updateTruncateLength);
    return () => window.removeEventListener("resize", updateTruncateLength);
  }, []);
  const listRef = useRef(null);

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleSongAdd = (song) => {
    try {
      const file = song.target.files[0];
      const url = URL.createObjectURL(file);
      setAddedSongs([...addedSongs, { url: url, name: file.name }]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = () => {
    try {
      addedSongsRef.current.click();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSongClick = (index, type) => {
    //for selecting songs to add in playlist
    if (selectSongs) {
      const songToAdd = addedSongs[index];
      const isPresent = playlistSongs[playlistIndex].some(
        (song) => song.url === songToAdd.url
      );
      if (!isPresent)
        setPlaylistSongs(
          playlistSongs.map((playlist, i) =>
            i === playlistIndex ? [...playlistSongs[i], songToAdd] : playlist
          )
        );

      setSelectSongs(false);
    } else {
      let indexToFind;
      //for playing songs from liked
      if (type === "Liked") {
        const song = likedSongs[index];
        indexToFind = addedSongs.findIndex((s) => song.url === s.url);
      } //for playing songs from playlist
      else if (type === "Playlist") {
        const song = playlistSongs[playlistIndex][index];
        indexToFind = addedSongs.findIndex((s) => song.url === s.url);
      } //for playing songs from library
      else indexToFind = index;
      setCurrentSongIndex(indexToFind);
    }
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
        {selectSongs && type === "Playlist" ? (
          <span className="flex items-center bg-white bg-opacity-10 rounded-3xl p-2">
            <p className="text-xs text-yellow-400">
              Click on the song from Library which you want to add in the
              playlist...
            </p>
            <CgClose
              className=" cursor-pointer checkmark min-w-8"
              onClick={() => setSelectSongs(false)}
            />
          </span>
        ) : (
          ""
        )}
        {(type === "Library"
          ? addedSongs
          : type === "Liked"
          ? likedSongs
          : playlists[playlistIndex]
          ? playlistSongs[playlistIndex]
          : []
        ).map((song, index) => (
          <div
            key={index}
            className={`m-2 text-wrap ${
              seeAll[type]
                ? "flex-grow-0 w-full h-12  duration-100 flex-row justify-between"
                : "rounded-full w-32 h-32 hover:border-y border-purple-600 shadow-2xl  bg-inherit flex-col"
            } hover:cursor-pointer transform transition-transform ease-linear hover:scale-105 duration-75 hover:rounded-full  flex flex-shrink-0 justify-center items-center `}
          >
            <span
              onClick={() => handleSongClick(index, type)}
              className={`hover:bg-white hover:bg-opacity-10 flex w-full h-full rounded-full items-center ${
                type === "Liked"
                  ? index ===
                      likedSongs.findIndex(
                        (liked) =>
                          addedSongs[currentSongIndex].url === liked.url
                      ) && "bg-white bg-opacity-10"
                  : type === "Library"
                  ? index === currentSongIndex && "bg-white bg-opacity-10"
                  : type === "Playlist"
                  ? index ===
                      playlistSongs[playlistIndex].findIndex(
                        (song) => addedSongs[currentSongIndex].url === song.url
                      ) && "bg-white bg-opacity-10"
                  : ""
              }`}
            >
              <BiPlay className="text-3xl w-16 min-w-8 text-yellow-400" />
              {seeAll[type] ? (
                <p className="text-white">
                  {song.name.length > 2 * truncateLength
                    ? song.name.substring(0, 2 * truncateLength + 1) + "..."
                    : song.name}
                </p>
              ) : (
                <p>
                  {song.name.length > 20
                    ? song.name.substring(0, 21) + "..."
                    : song.name}
                </p>
              )}
            </span>
            <button>
              <CgClose
                className="checkmark"
                onClick={() => {
                  if (type === "Library") {
                    const isPresentInLiked = likedSongs.some(
                      (liked) => liked.url === song.url
                    );

                    isPresentInLiked &&
                      setLikedSongs(
                        likedSongs.filter((liked) => liked.url !== song.url)
                      );

                    const updatedPlaylist = playlistSongs.map((playlist) =>
                      playlist.filter((s) => s.url !== song.url)
                    );

                    setPlaylistSongs(updatedPlaylist);

                    let updatedAddedSongs = addedSongs.filter(
                      (s) => s.url !== song.url
                    );
                    setAddedSongs(updatedAddedSongs);
                  } else if (type === "Liked") {
                    setLikedSongs(
                      likedSongs.filter((liked) => liked.url !== song.url)
                    );
                  } else {
                    const updatedPlaylist = playlistSongs.map((playlist) =>
                      playlist.filter((s) => s.url !== song.url)
                    );
                    setPlaylistSongs(updatedPlaylist);
                  }
                }}
              />
            </button>
          </div>
        ))}
        {likedSongs.length === 0 && type === "Liked" ? (
          <p>No liked songs added yet.</p>
        ) : (
          ""
        )}
        {addedSongs.length === 0 && type === "Library" ? (
          <p>No songs added in Library yet.</p>
        ) : (
          ""
        )}
      </>
    );
  }

  const PlaylistList = () => (
    <>
      {playlists.map((playlist, index) => (
        <div
          key={index}
          className="flex-grow-0 w-full h-12  hover:scale-105  hover:rounded-full duration-100 flex justify-between cursor-pointer items-center"
        >
          <span
            className="hover:bg-white hover:bg-opacity-10 flex w-full h-full rounded-full items-center"
            onClick={() => {
              setOpenPlaylist(true);
              setPlaylistIndex(index);
            }}
          >
            <CgPlayList className="text-3xl" />
            <p className="text-white">
              {playlist
                ? playlist.length > truncateLength
                  ? playlist.substring(0, truncateLength + 1) + "..."
                  : playlist
                : ""}
            </p>
          </span>
          <CgClose
            className="checkmark"
            onClick={() => {
              const updatedPlaylist = playlists.filter((_, i) => i !== index);
              const updatedPlaylistSongs = playlistSongs.filter(
                (_, i) => i !== index
              );
              setPlaylistSongs(updatedPlaylistSongs);
              setPlaylists(updatedPlaylist);
            }}
          />
        </div>
      ))}
      {playlists.length === 0 ? <p>No playlists created yet.</p> : ""}
    </>
  );

  useEffect(() => {
    if (page === "Liked") {
      setIsWriting(false);
      setOpenPlaylist(false);
      setSelectSongs(false);
    }
  }, [page]);

  useEffect(() => {
    if (!isWriting) setPlaylistName("");
  }, [isWriting]);

  /**I have added default songs for demonstration.
   * This 'defaultSongs' array is made of songs using relative URL from the 'public/test-songs' folder
   * When you input a song by clicking 'Add song' in the player, you are adding the song by creating a blob URL dynamically.
   * Since blob URLs are unique everytime they are created I have used relative URLs to showcase some songs as an example.
   * If you are using this module for your own project then remove the following.
   */
  const defaultSongs = [
    {
      url: "test-songs/Attention - Charlie Puth.mp3",
      name: "Attention - Charlie Puth.mp3",
    },
    {
      url: "test-songs/Baby One More Time - Britney Spears.mp3",
      name: "Baby One More Time - Britney Spears.mp3",
    },
    {
      url: "test-songs/Closer - The Chainsmokers.mp3",
      name: "Closer - The Chainsmokers.mp3",
    },
    {
      url: "test-songs/Golden Hour - JVKE.mp3",
      name: "Golden Hour - JVKE.mp3",
    },
    {
      url: "test-songs/My Heart Will Go On - Celine Dion.mp3",
      name: "My Heart Will Go On - Celine Dion.mp3",
    },
    {
      url: "test-songs/Perfect - Ed Sheeran.mp3",
      name: "Perfect - Ed Sheeran.mp3",
    },
    {
      url: "test-songs/Houdini - Eminem.mp3",
      name: "Houdini - Eminem.mp3",
    },
    {
      url: "test-songs/Stuck With U - Ariana Grande, Justin Bieber.mp3",
      name: "Stuck With U - Ariana Grande, Justin Bieber.mp3",
    },
  ];
  useEffect(() => setAddedSongs(defaultSongs), []);
  ////
  // useEffect(() => {
  //   alert(
  //     "I have added default songs for demonstration.\n If you are using this module for your own project then you can remove it from `Home.js`"
  //   );
  // }, []);

  console.log(addedSongs);
  console.log(addedSongs[currentSongIndex]);
  return (
    <div
      className={`w-full h-full flex flex-row ${
        themes === 0
          ? `bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900`
          : themes === 1
          ? `bg-gradient-to-tl from-neutral-900 via-sky-900 to-neutral-900`
          : `bg-gradient-to-tl from-slate-900 via-fuchsia-900 to-slate-900`
      } adjustible-padding overflow-y-auto pb-24`}
    >
      <div
        className={`w-full h-full flex flex-col ${
          themes === 0
            ? "bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 bg-clip-text text-transparent"
            : themes === 1
            ? "bg-gradient-to-r from-sky-500 via-sky-200 to-sky-500 bg-clip-text text-transparent"
            : "bg-gradient-to-r from-fuchsia-400 via-pink-100 to-fuchsia-400 bg-clip-text text-transparent"
        } px-8 pt-8 z-0`}
      >
        <div className="w-full flex flex-col rounded-3xl px-4 h-1/3 bg-white bg-opacity-10 flex-shrink-0">
          <div className="flex justify-between items-center w-full h-full">
            <span className="justify-center flex flex-col italic mr-8">
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
          <div className="border-t-2  flex justify-end text-white ">
            <span
              onClick={handleClick}
              className="w-auto m-1 flex items-center checkmark text-lg"
            >
              <p>Add songs </p>
              <IoAddCircle className="text-2xl" />
            </span>

            <input
              type="file"
              ref={addedSongsRef}
              accept="audio/*"
              onChange={handleSongAdd}
              className="hidden"
            />
          </div>
        </div>
        <div className="mt-8 mx-1 w-full h-auto flex flex-col flex-grow m-1 text-white pb-24 font-mono">
          <span className="flex justify-between">
            <p className="font-bold">Library</p>
            <button
              onClick={() => setSeeAll({ ...seeAll, Library: !seeAll.Library })}
              className="checkmark"
            >
              {seeAll.Library ? <MdArrowCircleUp /> : <MdExpandCircleDown />}
            </button>
          </span>

          {seeAll.Library ? (
            <div className="w-full flex flex-col rounded-3xl backdrop-blur-xl flex-wrap flex-shrink-0 m-1 p-8 pr-12 bg-white bg-opacity-10">
              <List type="Library" />
            </div>
          ) : (
            <span className="flex w-full h-auto items-center p-1">
              <button onClick={scrollLeft}>
                <BiLeftArrow className="text-3xl checkmark absolute opacity-100 hover:opacity-0" />
                <BiSolidLeftArrow className="text-3xl checkmark opacity-0 hover:opacity-100" />
              </button>
              <div
                ref={listRef}
                className="w-full h-auto min-h-16 flex items-center overflow-x-auto overflow-y-hidden shrink rounded-full bg-white bg-opacity-10 p-2"
              >
                <List type="Library" />
              </div>
              <button onClick={scrollRight}>
                <BiRightArrow className="text-3xl checkmark absolute opacity-100 hover:opacity-0" />
                <BiSolidRightArrow className="text-3xl checkmark  opacity-0 hover:opacity-100" />
              </button>
            </span>
          )}
        </div>
      </div>
      <div className="top-0 right-0 w-1/3 py-32 px-4 fixed h-full text-white font-mono">
        <div className="w-full h-full flex flex-col bg-white bg-opacity-10 rounded-3xl">
          <div className="flex justify-between w-full h-auto px-4 pt-4 items-center">
            <span className="flex items-center">
              <span className="flex items-center">
                {openPlaylist && (
                  <MdArrowBack
                    onClick={() => {
                      setOpenPlaylist(false);
                      setSelectSongs(false);
                    }}
                    className="checkmark"
                  />
                )}
                <p className="font-bold text-base">
                  {page === "Liked" ? "Liked Songs" : "Playlists "}
                </p>
              </span>
              <p>
                {openPlaylist &&
                  playlists[playlistIndex] &&
                  (playlists[playlistIndex].length > truncateLength / 2
                    ? " > " +
                      playlists[playlistIndex].substring(
                        0,
                        truncateLength / 2 + 1
                      ) +
                      "..."
                    : " > " + playlists[playlistIndex])}
              </p>
            </span>

            {openPlaylist ? (
              <button
                onClick={() => setSelectSongs(true)}
                className="flex checkmark items-center"
              >
                <p className="text-base">Add </p>
                <IoAddCircle />
              </button> /**adding songs in playist */
            ) : (
              page === "Playlist" && (
                <button
                  onClick={() => {
                    setIsWriting(true);
                    setPlaylistSongs([...playlistSongs, []]);
                  }}
                  className="flex checkmark items-center"
                >
                  <p className="text-base">Create </p>
                  <IoAddCircle />
                </button> /**adding playlists */
              )
            )}
          </div>
          <div className="bg-white h-0.5 m-4" />
          {isWriting ? (
            <div className="flex w-full h-auto items-center px-2 m-1">
              <input
                type="text"
                className="bg-transparent border-dashed rounded-lg border text-sm resize-none w-full outline-none px-2 "
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="Enter playlist name..."
              />
              {playlistName.length !== 0 && (
                <TiTick
                  onClick={() => {
                    setPlaylists([...playlists, playlistName]);
                    setIsWriting(false);
                  }}
                  className="checkmark"
                />
              )}
              <CgClose
                className="checkmark"
                onClick={() => setIsWriting(false)}
              />
            </div>
          ) : null}
          <div className="w-full flex-grow overflow-y-auto flex flex-col rounded-3xl backdrop-blur-xl px-8">
            {openPlaylist ? (
              <List type="Playlist" />
            ) : page === "Liked" ? (
              <List type="Liked" />
            ) : (
              <PlaylistList />
            )}
          </div>
        </div>
      </div>

      <div className="player  h-[calc(10%)] w-full fixed bottom-0 left-0 flex px-8  items-center  ">
        <Player
          songs={addedSongs}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          likedSongs={likedSongs}
          setLikedSongs={setLikedSongs}
          truncateLength={truncateLength}
        />
      </div>
    </div>
  );
}
