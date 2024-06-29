import { useRef, useState, useEffect } from "react";
import userLogo from "./userLogo.jpg";
import Player from "./Player";
import { CgAdd, CgClose } from "react-icons/cg";
import { TiTick } from "react-icons/ti";
import { FaBackward } from "react-icons/fa";

export default function Home({ page }) {
  const [addedSongs, setAddedSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1); // -1 means no song selected
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
  const [seeAll, setSeeAll] = useState({
    Library: false,
    Liked: true,
    Playlist: true,
    Recent: false,
  });

  const handleSongAdd = (song) => {
    const file = song.target.files[0];
    const url = URL.createObjectURL(file);
    setAddedSongs([...addedSongs, { url: url, name: file.name }]);
  };

  const handleClick = () => {
    addedSongsRef.current.click();
  };

  const handleSongClick = (index, type) => {
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
      let indexToFind = index;
      if (type === "Liked") {
        const song = likedSongs[index];
        indexToFind = addedSongs.findIndex((s) => song.url === s.url);
      }
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
        {(type === "Library"
          ? addedSongs
          : type === "Liked"
          ? likedSongs
          : playlistSongs[playlistIndex]
        ).map((song, index) => (
          <div
            key={index}
            className={`m-2 p-2 text-wrap ${
              seeAll[type]
                ? "flex-grow-0 w-full h-16 border-b border-fuchsia-950 hover:scale-110 hover:bg-white hover:bg-opacity-5 hover:rounded-full duration-100 flex justify-between"
                : "rounded-full w-32 h-32 hover:border-y border-purple-600 shadow-2xl hover:scale-125 duration-200 bg-inherit"
            } hover:cursor-pointer transform transition-transform ease-linear flex flex-col flex-shrink-0 justify-center items-center`}
            onClick={() => handleSongClick(index, type)}
          >
            <span className="flex justify-between items-center w-full">
              <p className="text-white">{song.name}</p>
              <button>
                <CgClose />
              </button>
            </span>
          </div>
        ))}
      </>
    );
  }

  const PlaylistList = () => (
    <>
      {playlists.map((playlist, index) => (
        <div
          key={index}
          className="flex-grow-0 w-full h-16 border-b border-fuchsia-950 hover:scale-110 hover:bg-white hover:bg-opacity-5 hover:rounded-full duration-100 flex justify-between cursor-pointer"
          onClick={() => {
            setOpenPlaylist(true);
            setPlaylistIndex(index);
          }}
        >
          <span className="flex justify-between items-center w-full">
            <p className="text-white">{playlist}</p>
            <button>
              <CgClose />
            </button>
          </span>
        </div>
      ))}
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
  return (
    <div className="w-full h-full flex flex-row bg-gradient-to-tl from-slate-900 via-fuchsia-900 to-slate-900 adjustible-padding overflow-y-auto pb-24">
      <div className="w-full h-full flex flex-col custom-text-color px-8 pt-8 z-0">
        <div className="w-full flex flex-col rounded-3xl px-4 h-1/3 bg-white bg-opacity-10 flex-shrink-0">
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
          <div className="border-t-2  flex justify-end text-fuchsia-200 ">
            <span
              onClick={handleClick}
              className="w-auto hover:bg-white hover:bg-opacity-10 p-2 cursor-pointer flex items-center rounded-full"
            >
              <p>Add songs </p>
              <CgAdd className="text-2xl" />
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
        <div className="mt-8 w-full h-auto flex flex-col flex-grow m-1 text-fuchsia-200 pb-24">
          <span className="flex justify-between">
            <p className="font-bold font-mono">Library</p>
            <button
              onClick={() => setSeeAll({ ...seeAll, Library: !seeAll.Library })}
            >
              {seeAll.Library ? "Collapse" : "Expand"}
            </button>
          </span>
          {seeAll.Library ? (
            <div className="w-full flex flex-col rounded-3xl backdrop-blur-xl flex-wrap flex-shrink-0 m-1 p-8 pr-12 bg-white bg-opacity-10">
              <List type="Library" />
            </div>
          ) : (
            <div className="w-full h-auto min-h-16 flex items-center overflow-x-auto overflow-y-hidden flex-none rounded-full bg-white bg-opacity-10">
              <List type="Library" />
            </div>
          )}
        </div>
      </div>
      <div className="top-0 right-0 w-1/3 py-32 px-4 fixed h-full text-white font-bold font-mono">
        <div className="w-full h-full flex flex-col bg-white bg-opacity-10 rounded-3xl">
          <FaBackward
            onClick={() => {
              setOpenPlaylist(false);
              setSelectSongs(false);
            }}
          />
          <div className="flex justify-between w-full h-auto px-8 pt-4">
            <p className="">{page === "Liked" ? "Liked Songs" : "Playlists"}</p>
            <p>{openPlaylist ? playlists[playlistIndex] : ""}</p>

            {openPlaylist ? (
              <button onClick={() => setSelectSongs(true)}>
                Add
              </button> /**adding songs in playist */
            ) : (
              page === "Playlist" && (
                <button
                  onClick={() => {
                    setIsWriting(true);
                    setPlaylistSongs([...playlistSongs, []]);
                  }}
                >
                  Add
                </button> /**adding playlists */
              )
            )}
          </div>
          <div className="bg-white h-0.5 m-4" />
          {isWriting ? (
            <div className="flex w-full h-auto items-center px-2 m-1">
              <input
                type="text"
                className="bg-transparent border text-sm resize-none w-full"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
              />
              <TiTick
                onClick={() => {
                  setPlaylists([...playlists, playlistName]);
                  setIsWriting(false);
                }}
              />
              <CgClose
                className=" hover:cursor-pointer"
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

      <div className="player backdrop-blur-xl h-[calc(10%)] w-full fixed bottom-0 left-0 flex px-8 items-center shadow-top">
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
