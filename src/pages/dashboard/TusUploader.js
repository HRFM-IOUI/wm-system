// src/components/dashboard/TusUploader.js
import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Upload } from "tus-js-client";

const TusUploader = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = () => {
    if (!file || !title) {
      setMessage("ファイルとタイトルを入力してください");
      return;
    }

    const upload = new Upload(file, {
      endpoint: "https://video.bunnycdn.com/tusupload",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_BUNNY_API_KEY}`,
        "Tus-Resumable": "1.0.0",
        LibraryId: process.env.REACT_APP_BUNNY_LIBRARY_ID,
      },
      metadata: {
        title,
        filetype: file.type,
      },
      onError: (error) => {
        console.error("❌ アップロード失敗:", error);
        setMessage("❌ アップロードに失敗しました");
        setUploading(false);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const percentage = Math.floor((bytesUploaded / bytesTotal) * 100);
        setProgress(percentage);
      },
      onSuccess: async () => {
        const videoId = upload.url.split("/").pop();
        const auth = getAuth();
        const currentUser = auth.currentUser;

        await addDoc(collection(db, "videos"), {
          ownerId: currentUser?.uid || "unknown",
          title,
          videoId,
          playbackUrl: `https://iframe.mediadelivery.net/play/${process.env.REACT_APP_BUNNY_LIBRARY_ID}/${videoId}`,
          createdAt: serverTimestamp(),
        });

        setMessage("✅ アップロード完了しました");
        setFile(null);
        setTitle("");
        setProgress(0);
        setUploading(false);
      },
    });

    setUploading(true);
    upload.start();
  };

  return (
    <div className="p-4 border rounded space-y-4 bg-white shadow-md">
      <h2 className="text-lg font-bold">TUSアップロード</h2>
      <input
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full"
      />
      {uploading && (
        <div className="w-full bg-gray-200 h-4 rounded">
          <div
            className="bg-green-500 h-4 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {uploading ? "アップロード中..." : "アップロード"}
      </button>
      {message && <p className="text-sm mt-2 text-gray-700">{message}</p>}
    </div>
  );
};

export default TusUploader;


