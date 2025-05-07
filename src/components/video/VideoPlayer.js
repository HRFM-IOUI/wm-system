// src/components/video/VideoPlayer.js
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ guid }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!guid) return;

    const video = videoRef.current;
    const streamUrl = `https://${process.env.REACT_APP_BUNNY_CDN_HOST}/${guid}/playlist.m3u8`;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, function (event, data) {
        console.error('HLS error', data);
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
    }
  }, [guid]);

  return (
    <div className="w-full">
      <video
        ref={videoRef}
        controls
        className="w-full rounded-xl shadow-md"
        poster={`https://${process.env.REACT_APP_BUNNY_CDN_HOST}/${guid}/thumbnail.jpg`}
      />
    </div>
  );
};

export default VideoPlayer;





