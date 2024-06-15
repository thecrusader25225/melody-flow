import React, { useState, useEffect } from "react";
import { BiMusic } from "react-icons/bi";

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

  useEffect(() => {
    // Cleanup previous audio when component unmounts or when url changes
    return () => {
      if (audio) {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      }
    };
  }, [audio]); // Only run effect when audio changes

  // Effect to set up new audio when url changes
  useEffect(() => {
    if (url) {
      setIsPlaying(false);

      const newAudio = new Audio(url);
      newAudio.addEventListener("loadedmetadata", () => {
        setDuration(newAudio.duration);
      });
      newAudio.addEventListener("timeupdate", () => {
        setCurrentTime(newAudio.currentTime);
      });
      newAudio.addEventListener("ended", () => {
        setIsPlaying(false);
      });

      setAudio(newAudio);
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
