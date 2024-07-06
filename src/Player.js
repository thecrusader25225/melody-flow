import { BiMusic, BiRepeat, BiShuffle, BiVolume } from "react-icons/bi";
import { useState, useEffect } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { GiNextButton, GiPauseButton, GiPreviousButton } from "react-icons/gi";
import { MdPlayCircleFilled } from "react-icons/md";
import { FaVolumeLow, FaVolumeXmark } from "react-icons/fa6";
import { IoHeartOutline, IoVolumeHigh } from "react-icons/io5";
import {
  BsFillVolumeUpFill,
  BsVolumeDown,
  BsVolumeDownFill,
  BsVolumeMute,
  BsVolumeOffFill,
  BsVolumeUp,
  BsVolumeUpFill,
} from "react-icons/bs";

export default function Player({
  songs,
  currentSongIndex,
  setCurrentSongIndex,
  likedSongs,
  setLikedSongs,
  truncateLength,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [muted, setMuted] = useState(false);
  const currentSong = songs[currentSongIndex] || { url: "", name: "" };
  const { url, name } = currentSong;

  // Effect to set up new audio when url changes and cleanup previous audio
  useEffect(() => {
    if (muted) audio.volume = 0;
    if (url) {
      setIsPlaying(false);

      const newAudio = new Audio(url);

      const handleLoadedMetadata = () => {
        setDuration(newAudio.duration);
      };
      const handleTimeUpdate = () => {
        setCurrentTime(newAudio.currentTime);
      };
      const handleEnded = () => {
        setIsPlaying(false);
      };
      newAudio.addEventListener("loadedmetadata", handleLoadedMetadata);
      newAudio.addEventListener("timeupdate", handleTimeUpdate);
      newAudio.addEventListener("ended", handleEnded);

      if (audio) {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      }

      setAudio(newAudio);
      setCurrentTime(0);

      return () => {
        if (audio) {
          audio.pause();
          audio.removeAttribute("src");
          audio.load();
        }
        newAudio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        newAudio.removeEventListener("timeupdate", handleTimeUpdate);
        newAudio.removeEventListener("ended", handleEnded);
      };
    }
  }, [url]);

  // Function to handle play/pause
  const handlePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Function to handle seeking
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audio) {
      audio.currentTime = newTime;
    }
  };
  //Function to handle volume
  const handleVolume = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audio) audio.volume = newVolume / 100;
    setMuted(false);
  };
  const handleMuted = () => {
    if (muted) {
      if (audio) audio.volume = volume / 100;
    } else {
      if (audio) audio.volume = 0;
    }
    setMuted(!muted);
  };
  //Function to handle next song
  const handleNext = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  };
  //Function to handle previous song
  const handlePrevious = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  };
  //Function to handle liked song
  const handleLikedSong = () => {
    if (likedSongs.some((song) => song.url === currentSong.url))
      setLikedSongs(likedSongs.filter((song) => song.url !== currentSong.url));
    else
      setLikedSongs([
        ...likedSongs,
        { url: currentSong.url, name: currentSong.name },
      ]);
  };
  console.log("muted: " + muted);
  return (
    <>
      <div className="h-auto w-full flex flex-row justify-between items-center  rounded-2xl p-2 backdrop-blur-lg bg-white bg-opacity-10">
        <span className="flex flex-row items-center justify-start w-1/3">
          <BiMusic className=" text-4xl w-16 min-w-16" />
          <p className="font-mono font-bold z-10 text-white text-wrap">
            {name
              ? name.length > 40 && 2 * truncateLength > 40
                ? name.substring(0, 41) + "..."
                : name.length > 2 * truncateLength
                ? name.substring(0, 2 * truncateLength) + "..."
                : name
              : "No songs playing"}
          </p>
          {/* like button */}
          <button
            onClick={handleLikedSong}
            className={`active:scale-125 duration-150 ease-linear m-2 ${
              !currentSong.name && "cursor-not-allowed"
            }`}
            disabled={!currentSong.name}
          >
            {likedSongs.some((song) => currentSong.name === song.name) ? (
              <HiHeart
                className={`checkmark text-3xl text-red-600 ${
                  !currentSong.name && "cursor-not-allowed"
                }`}
              />
            ) : (
              <HiOutlineHeart
                className={`checkmark text-3xl text-red-600 ${
                  !currentSong.name && "cursor-not-allowed"
                }`}
              />
            )}
          </button>
        </span>
        <span className="flex flex-col w-1/2 items-center justify-center px-4">
          <div className="z-10 flex justify-between w-1/2 p-2 items-center">
            {/* shuffle button */}
            <button>
              <BiShuffle className="checkmark" />
            </button>
            {/* previous button */}
            <button className=" z-10" onClick={handlePrevious}>
              <GiPreviousButton className="checkmark text-3xl hover:text-white text-neutral-400" />
            </button>
            {/* play/pause button */}
            <button
              className={`playpause z-10 ${
                !currentSong.name && "cursor-not-allowed"
              }`}
              onClick={handlePlayPause}
              disabled={!currentSong.name}
            >
              {isPlaying ? (
                <GiPauseButton
                  className={`checkmark text-4xl hover:scale-125 duration-100 ${
                    !currentSong.name && "cursor-not-allowed"
                  }`}
                />
              ) : (
                <MdPlayCircleFilled
                  className={`checkmark text-4xl hover:scale-125 duration-100 ${
                    !currentSong.name && "cursor-not-allowed"
                  }`}
                />
              )}
            </button>
            {/* next button */}
            <button className="text-3xl z-10" onClick={handleNext}>
              <GiNextButton className="checkmark text-3xl hover:text-white text-neutral-400" />
            </button>

            {/* repeat button */}
            <button>
              <BiRepeat className="checkmark" />
            </button>
          </div>
          {/* seek bar */}

          <input
            className={`w-full bg-purple-950 ${
              !currentSong.name && "cursor-not-allowed"
            } mb-1`}
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            disabled={!currentSong.name}
          />
        </span>
        <span className="w-1/3 flex justify-end">
          {/* volume */}
          <div className="flex items-center  px-4">
            <button onClick={handleMuted} className="checkmark">
              {muted ? (
                <BsVolumeMute />
              ) : volume >= 50 ? (
                <BsVolumeUpFill />
              ) : volume > 0 ? (
                <BsVolumeDownFill />
              ) : (
                <BsVolumeOffFill />
              )}
            </button>

            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={handleVolume}
            />
          </div>
        </span>
      </div>
    </>
  );
}
