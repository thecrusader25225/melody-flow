import { BiMusic, BiHeart } from "react-icons/bi";
import { useState, useEffect } from "react";
import { HiHeart } from "react-icons/hi";

export default function Player({
  songs,
  currentSongIndex,
  setCurrentSongIndex,
  likedSongs,
  setLikedSongs,
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
  console.log(likedSongs);
  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <div
        className={`z-0 flex justify-center items-center h-auto w-full relative ${
          isPlaying ? "animate-spin-slow" : ""
        }`}
      >
        <div className="z-1 bg-red-600 pt-half w-1/2 items-center justify-center flex rounded-full" />
        <BiMusic className="absolute text-4xl" />
      </div>
      <p className="mt-2 text-center">{name}</p>

      <div className="flex justify-between w-full">
        <button className="text-3xl" onClick={handlePrevious}>
          «
        </button>
        <button className="playpause" onClick={handlePlayPause}>
          {isPlaying ? "||" : "▶"}
        </button>
        <button className="text-3xl" onClick={handleNext}>
          »
        </button>
        <button onClick={handleLikedSong}>
          <HiHeart />
        </button>
      </div>
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleSeek}
      />
    </div>
  );
}
