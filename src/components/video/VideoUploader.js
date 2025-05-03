// src/components/video/VideoUploader.js
import React, { useState } from "react";
import { uploadVideoToBunny, checkVideoStatus } from "../../utils/bunnyUtils";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const VideoUploader = ({ ownerId }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("sample");
  const [isPrivate, setIsPrivate] = useState(false);
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
      const { videoId } = await uploadVideoToBunny(file, title);

      setMessage("エンコード確認中...");
      let status = null;
      for (let i = 0; i < 10; i++) {
        await new Promise((res) => setTimeout(res, 3000));
        const check = await checkVideoStatus(videoId);
        if (check?.encodeProgress === 100 && check?.thumbnailFileName) {
          status = check;
          break;
        }
      }

      if (!status || status.encodeProgress < 100) {
        throw new Error("エンコードが完了しませんでした");
      }

      const playbackUrl = `https://${process.env.REACT_APP_BUNNY_CDN_HOST}/${videoId}/playlist.m3u8`;
      const thumbnailUrl = `https://${process.env.REACT_APP_BUNNY_CDN_HOST}/${videoId}/thumbnails/${status.thumbnailFileName}`;

      await addDoc(collection(db, "videos"), {
        ownerId,
        title,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        category,
        type,
        isPrivate,
        videoId,
        playbackUrl,
        thumbnailUrl,
        createdAt: serverTimestamp(),
      });

      setMessage("アップロード完了！");
      setFile(null);
      setTitle("");
      setTags("");
      setCategory("");
      setType("sample");
      setIsPrivate(false);
    } catch (error) {
      console.error("アップロード失敗:", error);
      setMessage("アップロード失敗");
    }

    setUploading(false);
  };

  return (
    <div className="p-4 border rounded-xl shadow-md bg-white space-y-3">
      <h2 className="text-lg font-bold">動画アップロード</h2>
      <input
        type="text"
        placeholder="タイトル"
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        accept="video/mp4,video/mov"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full"
      />
      <input
        type="text"
        placeholder="タグ（カンマ区切り）"
        className="w-full p-2 border rounded"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        type="text"
        placeholder="カテゴリ"
        className="w-full p-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <div className="space-y-2">
        <label className="block font-medium">投稿タイプ</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="sample">サンプル</option>
          <option value="main">本編</option>
          <option value="dmode">DMODE</option>
        </select>
      </div>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
        />
        <span>非公開（自分のみ視聴可）</span>
      </label>
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

export default VideoUploader;










