import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [video, setVideo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      title,
      description: desc,
      mediaUrl: previewUrl,
      type: 'video',
      user: {
        name: 'あなた',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
      stats: {
        likes: 0,
        views: 0,
      },
      isPublic: true,
    };

    const existing = JSON.parse(localStorage.getItem('posts') || '[]');
    localStorage.setItem('posts', JSON.stringify([newPost, ...existing]));
    navigate('/toppage');
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-pink-500">新しい投稿</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />           <textarea
            placeholder="説明文"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full p-3 border rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="w-full"
            required
          />

          {previewUrl && (
            <div className="mt-4">
              <video
                src={previewUrl}
                controls
                className="w-full rounded border"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded transition"
          >
            投稿する
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;