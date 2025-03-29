import React, { useEffect, useRef, useState } from 'react';

const GachaBGMController = ({ src = "/assets/bgm/vip_theme.mp3", autoPlay = true }) => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      // 再生はユーザー操作後にのみ許可されることがある
      const playAudio = async () => {
        try {
          await audioRef.current.play();
        } catch (e) {
          console.log("🔇 自動再生がブロックされました:", e);
        }
      };
      playAudio();
    }

    return () => {
      audioRef.current?.pause();
      audioRef.current.currentTime = 0;
    };
  }, [autoPlay]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop muted={isMuted} />
      <button
        onClick={toggleMute}
        className="fixed top-4 right-4 bg-black text-white text-xs px-2 py-1 rounded z-50 shadow"
      >
        {isMuted ? '🔇 ミュート' : '🔊 音あり'}
      </button>
    </>
  );
};

export default GachaBGMController;
