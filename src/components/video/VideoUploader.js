import React, { useState } from "react";
import { uploadVideoToBunny } from "../../utils/bunnyUtils";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const VideoUploader = ({ ownerId }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file || !title) {
      setMessage("動画ファイルとタイトルを入力してください");
      return;
    }

    setUploading(true);
    setMessage("アップロード中...");

    try {
      const { videoId, playbackUrl } = await uploadVideoToBunny(file, title);

      await addDoc(collection(db, "videos"), {
        ownerId,
        title,
        videoId,
        playbackUrl,
        createdAt: serverTimestamp(),
      });

      setMessage("アップロード成功！");
      setFile(null);
      setTitle("");
    } catch (error) {
      console.error("アップロード失敗:", error);
      setMessage("アップロード失敗");
    }

    setUploading(false);
  };

  return (
    <div className="p-4 border rounded-xl shadow-md bg-white">
      <h2 className="text-lg font-bold mb-2">動画アップロード</h2>
      <input
        type="text"
        placeholder="タイトル"
        className="w-full p-2 mb-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        accept="video/mp4"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {uploading ? "アップロード中..." : "アップロード"}
      </button>
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default VideoUploader;

