// src/components/video/VideoPlayer.js
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoUrl || !videoRef.current) return;

    const video = videoRef.current;
    let hls;

    if (Hls.isSupported() && videoUrl.endsWith('.m3u8')) {
      hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, function (event, data) {
        console.error('HLS error', data);
      });
    } else {
      video.src = videoUrl;
    }

    return () => {
      if (hls) {
        hls.destroy(); // メモリ解放
      } else {
        video.src = ''; // 非HLS用でも再生中断
      }
    };
  }, [videoUrl]);

  return (
    <div className="w-full">
      <video
        ref={videoRef}
        controls
        className="w-full rounded-xl shadow-md"
      />
    </div>
  );
};

export default VideoPlayer;






