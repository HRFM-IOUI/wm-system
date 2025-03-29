// src/pages/Toppage.js
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactionButtons from '../components/ReactionButtons';
import CommentSection from '../components/CommentSection';

const Toppage = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const observer = useRef();
  const videoRefs = useRef([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');

    const dummyPosts = [
      {
        id: 1,
        owner: 'cafe_lover',
        content: '代官山のカフェラテ最高だった… #カフェ巡り #ラテアート',
        video: 'https://cdn.coverr.co/videos/coverr-pouring-coffee-1610/1080p.mp4',
        isPublic: true,
      },
      {
        id: 2,
        owner: 'tokyo_vlog',
        content: '【Vlog】浅草〜秋葉原をぶらり旅。映えスポットも紹介！',
        video: 'https://cdn.coverr.co/videos/coverr-tokyo-nightlife-1612/1080p.mp4',
        isPublic: true,
      },
      {
        id: 3,
        owner: 'fitness_japan',
        content: '宅トレ1ヶ月経過！腹筋割れてきた気がする…？',
        video: 'https://cdn.coverr.co/videos/coverr-working-out-1614/1080p.mp4',
        isPublic: true,
      },
    ];

    const allPosts = [...savedPosts, ...dummyPosts];
    setPosts(allPosts);
    setVisiblePosts(allPosts.slice(0, 5));
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

  useEffect(() => {
    const options = { threshold: 0.6 };
    const handlePlayOnView = entries => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          videoRefs.current.forEach(v => {
            if (v !== video) v.pause();
          });
          video.play().catch(e => console.error('再生エラー:', e));
        } else {
          video.pause();
        }
      });
    };

    const videoObserver = new IntersectionObserver(handlePlayOnView, options);
    videoRefs.current.forEach(video => {
      if (video) videoObserver.observe(video);
    });

    return () => {
      videoRefs.current.forEach(video => {
        if (video) videoObserver.unobserve(video);
      });
    };
  }, [visiblePosts]);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50 text-black">
      <aside className="hidden md:block md:w-1/5 p-4 bg-white shadow h-screen sticky top-0">
        <nav className="flex flex-col gap-4">
          <Link to="/toppage" className="font-semibold hover:underline">ホーム</Link>
          <Link to="/search" className="hover:underline">検索</Link>
          <Link to="/mypage" className="hover:underline">マイページ</Link>
          <Link to="/gacha" className="hover:underline">ガチャ</Link>
        </nav>
      </aside>

      <main className="flex-1 p-4 space-y-8">
        {visiblePosts.map((post, index) => (
          <div
            key={post.id}
            ref={index === visiblePosts.length - 1 ? lastPostRef : null}
            className="bg-white shadow rounded-lg p-4"
          >
            <div className="text-sm text-gray-600 mb-2">{post.owner || 'ゲスト'}</div>
            <video
              className="w-full rounded mb-2"
              src={post.mediaUrl || post.video}
              controls
              preload="metadata"
              muted
              ref={el => (videoRefs.current[index] = el)}
            />
            <p>{post.title || post.content}</p>
            <ReactionButtons postId={post.id} />
            <CommentSection postId={post.id} />
          </div>
        ))}
      </main>

      <aside className="hidden md:block md:w-1/5 p-4 bg-white shadow h-screen sticky top-0">
        <h3 className="font-bold mb-2">おすすめ</h3>
        <ul className="text-sm space-y-2">
          <li><Link to="/signup" className="hover:underline">サインアップ</Link></li>
          <li><Link to="/login" className="hover:underline">ログイン</Link></li>
          <li><Link to="/contact" className="hover:underline">お問い合わせ</Link></li>
        </ul>
      </aside>

      <Link
        to="/gacha"
        className="fixed bottom-20 right-5 bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform z-50"
      >
        ガチャ
      </Link>

      <footer className="md:hidden fixed bottom-0 w-full bg-white shadow-md flex justify-around py-2 border-t z-40 text-xs">
        <Link to="/toppage" className="flex flex-col items-center">
          <svg className="w-5 h-5 mb-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2L2 9h2v9h5v-6h2v6h5V9h2L10 2z" /></svg>
          ホーム
        </Link>
        <Link to="/search" className="flex flex-col items-center">
          <svg className="w-5 h-5 mb-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387-1.414 1.414-4.387-4.387zM10 16a6 6 0 100-12 6 6 0 000 12z" /></svg>
          検索
        </Link>
        <Link to="/mypage" className="flex flex-col items-center">
          <svg className="w-5 h-5 mb-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zM2 18a8 8 0 1116 0H2z" /></svg>
          マイページ
        </Link>
        <Link to="/gacha" className="flex flex-col items-center">
          <svg className="w-5 h-5 mb-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3h12v2H4V3zm0 4h12v2H4V7zm0 4h12v2H4v-2zm0 4h12v2H4v-2z" /></svg>
          ガチャ
        </Link>
      </footer>
    </div>
  );
};

export default Toppage;

