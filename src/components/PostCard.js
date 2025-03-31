import React, { useRef, useEffect, useState } from "react";
import { Volume2, VolumeX, PlayCircle, PauseCircle } from "lucide-react";

const PostCard = ({ video }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered || window.innerWidth < 768) {
        handlePlay();
      } else {
        handlePause();
      }
    }
  }, [isHovered]);

  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="w-full h-auto"
        loop
        playsInline
        muted={isMuted}
      />

      {/* ミュートアイコン */}
      <button
        onClick={toggleMute}
        className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      {/* 再生/停止アイコン */}
      <div className="absolute bottom-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white">
        {isPlaying ? <PlayCircle size={18} /> : <PauseCircle size={18} />}
      </div>

      <div className="p-3 bg-white">
        <h2 className="text-lg font-semibold">{video.title}</h2>
        <p className="text-gray-600 text-sm">{video.description}</p>
      </div>
    </div>
  );
};

export default PostCard;
