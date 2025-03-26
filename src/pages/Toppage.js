import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactionButtons from '../components/ReactionButtons';
import CommentSection from '../components/CommentSection';

const Toppage = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const observer = useRef();

  useEffect(() => {
    const dummyPosts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      owner: `ユーザー${i + 1}`,
      content: 'これはダミー投稿です。',
      video: 'https://cdn.coverr.co/videos/coverr-lonely-palm-tree-9426/1080p.mp4',
      isPublic: true,
    }));
    setPosts(dummyPosts);
    setVisiblePosts(dummyPosts.slice(0, 5));
  }, []);

  const lastPostRef = useRef(null);
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisiblePosts(prev => {
          const next = posts.slice(prev.length, prev.length + 5);
          return [...prev, ...next];
        });
      }
    });

    if (lastPostRef.current) {
      observer.current.observe(lastPostRef.current);
    }
  }, [visiblePosts, posts]);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50 text-black">
      {/* 左サイドバー */}
      <aside className="hidden md:block md:w-1/5 p-4 bg-white shadow h-screen sticky top-0">
        <nav className="flex flex-col gap-4">
          <Link to="/toppage" className="font-semibold hover:underline">ホーム</Link>
          <Link to="/gacha" className="hover:underline">ガチャ</Link>
          <Link to="/vendor" className="hover:underline">出品</Link>
        </nav>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 p-4 space-y-8">
        {visiblePosts.map((post, index) => (
          <div
            key={post.id}
            ref={index === visiblePosts.length - 1 ? lastPostRef : null}
            className="bg-white shadow rounded-lg p-4"
          >
            <div className="text-sm text-gray-600 mb-2">{post.owner}</div>
            <video
              className="w-full rounded mb-2"
              src={post.video}
              controls
              preload="metadata"
              muted
            />
            <p>{post.content}</p>
            <ReactionButtons postId={post.id} />
            <CommentSection postId={post.id} />
          </div>
        ))}
      </main>

      {/* 右サイドバー */}
      <aside className="hidden md:block md:w-1/5 p-4 bg-white shadow h-screen sticky top-0">
        <h3 className="font-bold mb-2">おすすめ</h3>
        <ul className="text-sm space-y-2">
          <li><Link to="/signup" className="hover:underline">新規登録</Link></li>
          <li><Link to="/login" className="hover:underline">ログイン</Link></li>
          <li><Link to="/contact" className="hover:underline">お問い合わせ</Link></li>
        </ul>
      </aside>

      {/* ガチャ導線ボタン */}
      <Link
        to="/gacha"
        className="fixed bottom-20 right-5 bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform z-50"
      >
        ガチャ
      </Link>

      {/* モバイル固定フッター */}
      <footer className="md:hidden fixed bottom-0 w-full bg-white shadow-md flex justify-around py-2 border-t z-40">
        <Link to="/toppage" className="text-center text-xs">ホーム</Link>
        <Link to="/gacha" className="text-center text-xs">ガチャ</Link>
        <Link to="/vendor" className="text-center text-xs">出品</Link>
      </footer>
    </div>
  );
};

export default Toppage;