import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [video, setVideo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 仮でlocalStorageへ保存（あとでAPIに切り替え予定）
    const newPost = {
      id: Date.now(),
      title,
      description: desc,
      videoUrl: video ? URL.createObjectURL(video) : '',
      user: {
        name: 'あなた',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      stats: {
        likes: 0,
        views: 0
      }
    };

    const existing = JSON.parse(localStorage.getItem('posts') || '[]');
    localStorage.setItem('posts', JSON.stringify([newPost, ...existing]));

    // 投稿完了後はトップページへ
    navigate('/toppage');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">新規投稿</h2>

        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        <textarea
          placeholder="説明文"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded h-32 resize-none"
        />

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
          className="w-full"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
        >
          投稿する
        </button>
      </form>
    </div>
  );
};

export default Post;