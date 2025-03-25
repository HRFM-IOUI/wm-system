import React, { useState, useEffect, useRef } from 'react';
import ReactionButtons from '@/components/ReactionButtons';

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
  },
]; const Toppage = () => {
  const [posts, setPosts] = useState([]);
  const containerRef = useRef(null);
  const observer = useRef(null);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const publicPosts = savedPosts.filter((p) => p.isPublic);
    setPosts([...dummyPosts, ...publicPosts]);
  }, []);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        // ダミー追加（ページネーション未実装）
        const moreDummy = dummyPosts.map((p) => ({
          ...p,
          id: Date.now() + Math.random(),
        }));
        setPosts((prev) => [...prev, ...moreDummy]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);   return (
    <div className="flex bg-white text-gray-800 min-h-screen" ref={containerRef}>
      {/* 左カラム */}
      <aside className="hidden lg:block w-[260px] border-r p-6 space-y-4">
        <h2 className="text-xl font-bold text-pink-500">WM SYSTEM</h2>
        <p className="text-sm text-gray-500">ようこそ、動画と商品が集まるプラットフォームへ！</p>
      </aside>

      {/* 中央カラム */}
      <main className="flex-1 max-w-2xl mx-auto p-4 space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg shadow p-4 bg-white space-y-4">
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
            <ReactionButtons post={post} />
          </div>
        ))}
      </main>

      {/* 右カラム */}
      <aside className="hidden xl:block w-[300px] border-l p-6 space-y-4">
        <h4 className="font-semibold text-pink-500">おすすめタグ</h4>
        <div className="flex flex-wrap gap-2 text-sm">
          {['#動画', '#画像', '#人気', '#限定', '#フォロー中'].map((tag) => (
            <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Toppage;