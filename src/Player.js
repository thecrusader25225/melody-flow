import { BiMusic } from "react-icons/bi";
import { useState, useEffect } from "react";

export default function Player({ song }) {
  const { url, name } = song;
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Function to handle play/pause
  function handlePlayPause() {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }

  // Function to handle seeking
  function handleSeek(e) {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audio.currentTime = newTime;
  }

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

      setAudio(newAudio);
      return () => {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
        newAudio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        newAudio.removeEventListener("timeupdate", handleTimeUpdate);
        newAudio.removeEventListener("ended", handleEnded);
      };
    }
  }, [url]); // Run effect when url changes

  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <div
        className={`flex justify-center items-center h-auto w-full relative ${
          isPlaying ? "animate-spin-slow" : ""
        }`}
      >
        <div className="bg-red-600 pt-half w-1/2 items-center justify-center flex rounded-full" />
        <BiMusic className="absolute text-4xl" />
      </div>
      <p className="mt-2 text-center">{name}</p>
      <button className="playpause" onClick={handlePlayPause}>
        {isPlaying ? "Pause" : "Play"}
      </button>
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
