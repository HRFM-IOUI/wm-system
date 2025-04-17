// src/pages/content/VideoList.js
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { deleteVideoFromBunny } from "../../utils/bunnyUtils";
import VideoPlayer from "../../components/video/VideoPlayer";

const VideoList = () => {
  const [user] = useAuthState(auth);
  const [videos, setVideos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const snap = await getDocs(collection(db, "videos"));
        const all = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // 公開 or オーナー本人の動画のみ表示
        const visible = all.filter(
          v => !v.isPrivate || v.ownerId === user?.uid
        );

        setVideos(visible);
        setFiltered(visible);

        // カテゴリ候補を抽出
        const cats = Array.from(new Set(
          visible.map(v => v.category).filter(Boolean)
        ));
        setCategories(cats);

        // タグ候補を抽出
        const tagSet = new Set();
        visible.forEach(v => (v.tags || []).forEach(t => tagSet.add(t)));
        setTags([...tagSet]);
      } catch (err) {
        console.error("動画一覧の取得に失敗:", err);
      }
    };

    if (user) {
      fetchVideos();
    }
  }, [user]);

  // カテゴリ or タグの選択で絞り込み
  useEffect(() => {
    let temp = [...videos];
    if (selectedCategory) {
      temp = temp.filter(v => v.category === selectedCategory);
    }
    if (selectedTag) {
      temp = temp.filter(v => v.tags?.includes(selectedTag));
    }
    setFiltered(temp);
  }, [selectedCategory, selectedTag, videos]);

  // 公開／非公開のトグル
  const handleTogglePrivacy = async (videoId, currentStatus) => {
    try {
      const ref = doc(db, "videos", videoId);
      await updateDoc(ref, { isPrivate: !currentStatus });
      setVideos(prev =>
        prev.map(v => (v.id === videoId ? { ...v, isPrivate: !currentStatus } : v))
      );
    } catch (err) {
      console.error("公開状態の更新失敗:", err);
    }
  };

  // 動画の削除
  const handleDelete = async (videoId, docId) => {
    try {
      await deleteVideoFromBunny(videoId);
      await deleteDoc(doc(db, "videos", docId));
      setVideos(prev => prev.filter(v => v.id !== docId));
    } catch (err) {
      console.error("削除エラー:", err);
      alert("削除に失敗しました");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 space-y-6">
      <h1 className="text-2xl font-bold">動画一覧</h1>

      {/* フィルター欄 */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">カテゴリ選択</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={selectedTag}
          onChange={e => setSelectedTag(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">タグ選択</option>
          {tags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>

        {(selectedCategory || selectedTag) && (
          <button
            onClick={() => {
              setSelectedCategory("");
              setSelectedTag("");
            }}
            className="text-sm text-pink-600 hover:underline"
          >
            フィルター解除
          </button>
        )}
      </div>

      {/* 動画リスト */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.length === 0 ? (
          <p className="text-gray-500">該当する動画がありません。</p>
        ) : (
          filtered.map(video => (
            <div key={video.id} className="bg-gray-50 rounded shadow p-4">
              <h2 className="text-lg font-semibold mb-2">{video.title}</h2>
              {video.thumbnailUrl ? (
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-auto rounded mb-2 object-cover cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded mb-2 text-gray-500">
                  <VideoPlayer playbackUrl={video.playbackUrl} />
                </div>
              )}
              <div className="text-sm text-gray-600 mt-2 space-y-1">
                {video.category && <p>カテゴリ: {video.category}</p>}
                {video.tags?.length > 0 && (
                  <p>タグ: {video.tags.join(", ")}</p>
                )}
                {video.isPrivate && (
                  <p className="text-xs text-pink-600 font-semibold">
                    非公開中
                  </p>
                )}
              </div>

              {video.ownerId === user?.uid && (
                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() => handleTogglePrivacy(video.id, video.isPrivate)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {video.isPrivate ? "公開にする" : "非公開にする"}
                  </button>
                  <button
                    onClick={() => handleDelete(video.videoId, video.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    削除
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* モーダルで動画再生 */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-2">{selectedVideo.title}</h2>
            <VideoPlayer playbackUrl={selectedVideo.playbackUrl} />
            <button
              onClick={() => setSelectedVideo(null)}
              className="mt-4 text-sm text-pink-600 hover:underline"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoList;







