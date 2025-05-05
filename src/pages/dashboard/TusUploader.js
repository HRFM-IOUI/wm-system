// src/components/dashboard/TusUploader.js
import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import * as tus from "tus-js-client";

const TusUploader = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = () => {
    if (!file || !title) {
      setMessage("❗ファイルとタイトルを入力してください");
      return;
    }

    const upload = new tus.Upload(file, {
      endpoint: "https://video.bunnycdn.com/tusupload",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_BUNNY_API_KEY}`
      },
      metadata: {
        title,
        filetype: file.type
      },
      onError: (error) => {
        console.error("❌ アップロード失敗:", error);
        setMessage("❌ アップロードに失敗しました");
        setUploading(false);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const percent = Math.floor((bytesUploaded / bytesTotal) * 100);
        setProgress(percent);
      },
      onSuccess: async () => {
        const uploadUrl = upload.url;
        const videoId = uploadUrl.split("/").pop();
        const auth = getAuth();
        const currentUser = auth.currentUser;

        try {
          await addDoc(collection(db, "videos"), {
            ownerId: currentUser?.uid || "unknown",
            title,
            videoId,
            playbackUrl: `${process.env.REACT_APP_BUNNY_CDN_URL}/${videoId}/playlist.m3u8`,
            createdAt: serverTimestamp(),
            type: "sample", // 必要に応じて"main"や"dmode"等へ拡張可
            isPrivate: false,
            tags: []
          });
          setMessage("✅ アップロード完了しました！");
        } catch (err) {
          console.error("Firestore保存失敗:", err);
          setMessage("⚠️ Firestoreへの保存に失敗しました");
        }

        setFile(null);
        setTitle("");
        setProgress(0);
        setUploading(false);
      }
    });

    setUploading(true);
    upload.start();
  };

  return (
    <div className="p-4 border rounded space-y-4 bg-white shadow-md">
      <h2 className="text-lg font-bold">🎥 大容量動画アップロード (TUS対応)</h2>

      <input
        type="text"
        placeholder="タイトルを入力"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full"
      />

      {uploading && (
        <div className="w-full bg-gray-200 h-4 rounded overflow-hidden">
          <div
            className="bg-blue-500 h-4 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {uploading ? `アップロード中... ${progress}%` : "アップロード"}
      </button>

      {message && (
        <p className="text-sm mt-2 text-gray-700 whitespace-pre-wrap">{message}</p>
      )}
    </div>
  );
};

export default TusUploader;

