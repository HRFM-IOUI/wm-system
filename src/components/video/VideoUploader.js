import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Upload } from "tus-js-client";
import { checkVideoStatus } from "../../utils/bunnyUtils";

const VideoUploader = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("sample");
  const [isPrivate, setIsPrivate] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file || !title) {
      setMessage("動画ファイルとタイトルを入力してください");
      return;
    }

    const BUNNY_API_KEY = process.env.REACT_APP_BUNNY_API_KEY;
    const BUNNY_LIBRARY_ID = process.env.REACT_APP_BUNNY_LIBRARY_ID;
    const BUNNY_CDN_HOST = process.env.REACT_APP_BUNNY_CDN_HOST;

    if (!BUNNY_API_KEY || !BUNNY_LIBRARY_ID || !BUNNY_CDN_HOST) {
      setMessage("環境変数が未設定です");
      return;
    }

    setUploading(true);
    setMessage("アップロード中...");

    const upload = new Upload(file, {
      endpoint: "https://video.bunnycdn.com/tusupload",
      metadata: {
        filename: file.name,
        filetype: file.type,
        title,
      },
      headers: {
        Authorization: `Bearer ${BUNNY_API_KEY}`,
        LibraryId: BUNNY_LIBRARY_ID,
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
        try {
          const urlParts = upload.url.split("/");
          const videoId = urlParts[urlParts.length - 1];

          let status = null;
          for (let i = 0; i < 10; i++) {
            await new Promise((r) => setTimeout(r, 3000));
            const check = await checkVideoStatus(videoId);
            if (check?.encodeProgress === 100 && check?.thumbnailFileName) {
              status = check;
              break;
            }
          }

          if (!status) {
            setMessage("⚠️ エンコード未完了。登録をスキップしました");
            setUploading(false);
            return;
          }

          const auth = getAuth();
          const currentUser = auth.currentUser;

          const playbackUrl = `https://${BUNNY_CDN_HOST}/${videoId}/playlist.m3u8`;
          const thumbnailUrl = `https://${BUNNY_CDN_HOST}/${videoId}/thumbnails/${status.thumbnailFileName}`;

          await addDoc(collection(db, "videos"), {
            ownerId: currentUser?.uid || "unknown",
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

          setMessage("✅ アップロード完了しました");
          setFile(null);
          setTitle("");
          setTags("");
          setCategory("");
          setType("sample");
          setIsPrivate(false);
          setProgress(0);
        } catch (e) {
          console.error("登録エラー:", e);
          setMessage("❌ Firestore登録に失敗しました");
        }
        setUploading(false);
      },
    });

    upload.start();
  };

  return (
    <div className="p-4 border rounded-xl shadow bg-white space-y-4">
      <h2 className="text-lg font-bold">TUS動画アップロード</h2>
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
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="sample">サンプル</option>
        <option value="main">本編</option>
        <option value="dmode">DMODE</option>
      </select>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
        />
        <span>非公開（自分のみ視聴可）</span>
      </label>

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

export default VideoUploader;















