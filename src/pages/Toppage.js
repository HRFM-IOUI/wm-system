import React, { useState, useEffect, useRef } from 'react';

const dummyPosts = [
  {
    id: 1,
    type: 'image',
    title: 'サンプル画像投稿',
    description: 'これは画像のサンプル投稿です。',
    mediaUrl: 'https://placehold.jp/400x300.png',
    user: {
      name: 'オーナー',
      avatar: 'https://i.pravatar.cc/150?img=59',
    },
    stats: {
      likes: 5,
      views: 120,
    },
    comments: [],
  },
  {
    id: 2,
    type: 'video',
    title: 'サンプル動画投稿',
    description: 'これは動画のサンプル投稿です。',
    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    user: {
      name: 'クリエーターX',
      avatar: 'https://i.pravatar.cc/150?img=33',
    },
    stats: {
      likes: 12,
      views: 240,
    },
    comments: [],
  },
];

const Toppage = () => {
  const [posts, setPosts] = useState([]);
  const [likeAnimations, setLikeAnimations] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const publicPosts = savedPosts.filter((p) => p.isPublic);
    setPosts([...dummyPosts, ...publicPosts]);
  }, []);

  const handleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, stats: { ...p.stats, likes: p.stats.likes + 1 } }
          : p
      )
    );
    setLikeAnimations((prev) => ({ ...prev, [postId]: true }));
    setTimeout(() => {
      setLikeAnimations((prev) => ({ ...prev, [postId]: false }));
    }, 1000);
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const handleCommentSubmit = (postId) => {
    const comment = commentInputs[postId]?.trim();
    if (!comment) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: [...(p.comments || []), comment] }
          : p
      )
    );
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };   return (
    <div className="flex bg-white text-gray-800 min-h-screen" ref={containerRef}>
      {/* 左カラム */}
      <aside className="hidden lg:block w-[260px] border-r p-6 space-y-4 fixed h-full overflow-auto">
        <h2 className="text-xl font-bold text-pink-500">WM SYSTEM</h2>
        <p className="text-sm text-gray-500">動画と商品が集まるプラットフォームへようこそ！</p>
      </aside>

      {/* 中央カラム */}
      <main className="flex-1 lg:ml-[260px] xl:mr-[300px] max-w-2xl mx-auto p-4 space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg shadow p-4 bg-white space-y-4 relative">
            <div className="flex items-center space-x-3">
              <img
                src={post.user?.avatar || 'https://i.pravatar.cc/150?img=1'}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-semibold">{post.user?.name || '匿名ユーザー'}</h4>
                <p className="text-xs text-gray-400">{post.type}</p>
              </div>
            </div>
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.description}</p>
            {post.type === 'image' && (
              <img src={post.mediaUrl} alt="media" className="rounded w-full" />
            )}
            {post.type === 'video' && (
              <video src={post.mediaUrl} controls className="rounded w-full" />
            )}
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleLike(post.id)}
                className="text-pink-500 hover:text-pink-600 font-semibold"
              >
                ❤️ {post.stats.likes}
              </button>
              {likeAnimations[post.id] && (
                <div className="absolute top-[-10px] right-[-10px] animate-bounce text-pink-400 text-2xl">🎈</div>
              )}
              <span className="text-gray-400 text-sm">{post.stats.views} views</span>
            </div>

            {/* コメント欄 */}
            <div className="mt-4">
              <input
                type="text"
                value={commentInputs[post.id] || ''}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
                placeholder="コメントを書く..."
                className="w-full border px-3 py-2 rounded text-sm"
              />
              <button
                onClick={() => handleCommentSubmit(post.id)}
                className="mt-1 text-sm bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                投稿
              </button>

              {/* コメント一覧 */}
              {post.comments?.length > 0 && (
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  {post.comments.map((cmt, index) => (
                    <li key={index} className="border-b py-1">{cmt}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </main>       {/* 右カラム */}
      <aside className="hidden xl:block w-[300px] border-l p-6 space-y-4 fixed right-0 top-0 h-full overflow-auto">
        <h4 className="font-semibold text-pink-500">おすすめタグ</h4>
        <div className="flex flex-wrap gap-2 text-sm">
          {['#動画', '#画像', '#人気', '#限定', '#フォロー中'].map((tag) => (
            <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </aside>

      {/* モバイル下部ナビゲーション（X風） */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2 shadow-md z-50 lg:hidden">
        <a href="/toppage" className="flex flex-col items-center text-gray-600 hover:text-pink-500 text-sm">
          <span className="material-icons">home</span>
          ホーム
        </a>
        <a href="/lounge" className="flex flex-col items-center text-gray-600 hover:text-pink-500 text-sm">
          <span className="material-icons">chat</span>
          ラウンジ
        </a>
        <a href="/owner" className="flex flex-col items-center text-gray-600 hover:text-pink-500 text-sm">
          <span className="material-icons">dashboard</span>
          ダッシュボード
        </a>
      </nav>
    </div>
  );
};

export default Toppage;