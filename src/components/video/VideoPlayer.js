import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ playbackUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !playbackUrl) return;

    // HLS.js がサポートされているブラウザの場合
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(playbackUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS エラー:", data);
      });

      return () => {
        hls.destroy();
      };
    }

    // ネイティブ HLS 対応（Safariなど）
    else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = playbackUrl;
    }
  }, [playbackUrl]);

  return (
    <video
      ref={videoRef}
      controls
      className="w-full rounded border"
      preload="metadata"
      playsInline
    />
  );
};

export default VideoPlayer;




