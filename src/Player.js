import { BiMusic, BiHeart } from "react-icons/bi";
import { useState, useEffect } from "react";
import { HiHeart } from "react-icons/hi";
import {
  GiNextButton,
  GiPauseButton,
  GiPlayButton,
  GiPreviousButton,
} from "react-icons/gi";

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
  const currentSong = songs[currentSongIndex] || { url: "", name: "" };
  const { url, name } = currentSong;

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

  // Effect to set up new audio when url changes and cleanup previous audio
  useEffect(() => {
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

  const handleNext = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  };
  const handleLikedSong = () => {
    if (likedSongs.some((song) => song.url == currentSong.url))
      setLikedSongs(likedSongs.filter((song) => song.url != currentSong.url));
    else
      setLikedSongs([
        ...likedSongs,
        { url: currentSong.url, name: currentSong.name },
      ]);
  };
  return (
    <>
      <div className="h-auto w-full flex flex-row justify-around items-center  rounded-2xl p-2 backdrop-blur-lg bg-white bg-opacity-10">
        <span className="flex flex-row items-center justify-start w-1/4">
          <BiMusic className=" text-4xl mr-4 w-16 min-w-16" />
          <p className=" text-center font-serif z-10 text-white text-wrap">
            {name.length > 40 && 2 * truncateLength > 40
              ? name.substring(0, 41) + "..."
              : 2 * truncateLength
              ? name.substring(0, 2 * truncateLength) + "..."
              : name}
          </p>
        </span>
        <span className="flex flex-col w-3/4 items-center">
          <div className="z-10 flex justify-between w-1/2 p-2">
            <button className=" z-10" onClick={handlePrevious}>
              <GiPreviousButton className="checkmark text-3xl" />
            </button>
            <button className="playpause z-10" onClick={handlePlayPause}>
              {isPlaying ? (
                <GiPauseButton className="checkmark text-3xl" />
              ) : (
                <GiPlayButton className="checkmark text-3xl" />
              )}
            </button>
            <button className="text-3xl z-10" onClick={handleNext}>
              <GiNextButton className="checkmark text-3xl" />
            </button>
            <button onClick={handleLikedSong}>
              <HiHeart
                className={`checkmark text-3xl ${
                  likedSongs.some((song) => currentSong.name === song.name) &&
                  "text-red-600"
                }`}
              />
            </button>
          </div>
          <input
            className="w-full bg-purple-950"
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />
        </span>
      </div>
    </>
  );
}
