// src/components/video/VideoPlayer.js
import React from "react";

const VideoPlayer = ({ playbackUrl }) => {
  if (!playbackUrl) {
    return <p>再生URLが無効です。</p>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <video
        controls
        className="w-full rounded-xl shadow"
        src={playbackUrl}
        type="application/x-mpegURL"
      >
        お使いのブラウザは video タグに対応していません。
      </video>
    </div>
  );
};

export default VideoPlayer;
