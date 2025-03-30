import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import VideoPlayer from '../../components/video/VideoPlayer';
import ReactionButtons from '../../components/common/ReactionButtons';
import CommentSection from '../../components/common/CommentSection';

const Toppage = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const observer = useRef();
  const videoRefs = useRef([]);
  const lastPostRef = useRef(null);

  // Firestoreから動画取得
  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setPosts(fetched);
      setVisiblePosts(fetched.slice(0, 5));
    };
    fetchPosts();
  }, []);

  // 無限スクロール
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

  // 可視領域再生管理
  useEffect(() => {
    const options = { threshold: 0.6 };
    const callback = entries => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          videoRefs.current.forEach(v => v !== video && v?.pause());
          video?.play().catch(() => {});
        } else {
          video?.pause();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    videoRefs.current.forEach((video) => video && observer.observe(video));

    return () => observer.disconnect();
  }, [visiblePosts]);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50 text-black">
      <aside className="hidden md:block md:w-1/5 p-4 bg-white shadow h-screen sticky top-0">
        <nav className="flex flex-col gap-4">
          <Link to="/toppage" className="font-semibold hover:underline">ホーム</Link>
          <Link to="/search" className="hover:underline">検索</Link>
          <Link to="/mypage" className="hover:underline">マイページ</Link>
          <Link to="/gacha-select" className="hover:underline">ガチャ</Link>
        </nav>
      </aside>

      <main className="flex-1 p-4 space-y-8">
        {visiblePosts.map((post, index) => (
          <div
            key={post.id}
            ref={index === visiblePosts.length - 1 ? lastPostRef : null}
            className="bg-white shadow rounded-lg p-4"
          >
            <div className="text-sm text-gray-600 mb-2">
              {post.ownerId?.slice(0, 6) || 'ゲスト'} さんの投稿
            </div>
            {post.playbackUrl ? (
              <VideoPlayer
                playbackUrl={post.playbackUrl}
                ref={(el) => (videoRefs.current[index] = el)}
              />
            ) : (
              <div className="bg-gray-200 h-60 rounded" />
            )}
            <p className="mt-2 text-sm text-gray-800">{post.title}</p>
            <ReactionButtons postId={post.id} />
            <CommentSection postId={post.id} />
          </div>
        ))}
      </main>

      <footer className="md:hidden fixed bottom-0 w-full bg-white shadow-md flex justify-around py-4 border-t z-60 text-lg">
        <Link to="/toppage" className="flex flex-col items-center text-lg">ホーム</Link>
        <Link to="/search" className="flex flex-col items-center text-lg">検索</Link>
        <Link to="/mypage" className="flex flex-col items-center text-lg">マイページ</Link>
        <Link to="/gacha-select" className="flex flex-col items-center text-lg">ガチャ</Link>
      </footer>
    </div>
  );
};

export default Toppage;








