// src/pages/Dashboard.js

import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import VideoUploader from "../../components/video/VideoUploader"; // ✅ 追加
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase"; // ✅ Firebase Auth を使う

const Dashboard = () => {
  const [user] = useAuthState(auth); // ✅ 現在のログインユーザー取得
  const [videos, setVideos] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrivate, setFilterPrivate] = useState("all");

  useEffect(() => {
    const fetchVideos = async () => {
      const snapshot = await getDocs(collection(db, "videos"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(data);
    };

    fetchVideos();
  }, []);

  const filtered = videos.filter((v) => {
    const matchCategory = !filterCategory || v.category === filterCategory;
    const matchType = !filterType || v.type === filterType;
    const matchPrivate =
      filterPrivate === "all" ||
      (filterPrivate === "private" && v.isPrivate) ||
      (filterPrivate === "public" && !v.isPrivate);
    return matchCategory && matchType && matchPrivate;
  });

  const handleDelete = async (id) => {
    if (window.confirm("本当に削除しますか？")) {
      await deleteDoc(doc(db, "videos", id));
      setVideos((prev) => prev.filter((v) => v.id !== id));
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">動画管理</h1>

      {/* ✅ 動画アップロードフォーム */}
      {user && (
        <VideoUploader ownerId={user.uid} />
      )}

      {/* フィルター */}
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="カテゴリで絞り込み"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">すべてのタイプ</option>
          <option value="sample">サンプル</option>
          <option value="main">本編</option>
          <option value="dmode">DMODE</option>
        </select>
        <select
          value={filterPrivate}
          onChange={(e) => setFilterPrivate(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">公開・非公開すべて</option>
          <option value="public">公開のみ</option>
          <option value="private">非公開のみ</option>
        </select>
      </div>

      {/* 一覧表示 */}
      <div className="grid gap-4">
        {filtered.map((video) => (
          <div
            key={video.id}
            className="border p-4 rounded shadow-sm bg-white space-y-1"
          >
            <div className="text-lg font-semibold">{video.title}</div>
            <div className="text-sm text-gray-600">
              カテゴリ: {video.category || "未設定"} | タイプ: {video.type}
            </div>
            <div className="text-sm text-gray-500">
              {video.isPrivate ? "🔒 非公開" : "🌐 公開中"}
            </div>
            <div className="flex gap-4 text-sm mt-2">
              <button
                onClick={() => handleDelete(video.id)}
                className="text-red-500 hover:underline"
              >
                削除
              </button>
              {video.playbackUrl && (
                <a
                  href={video.playbackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  再生確認
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;















