import React, { useEffect, useState, useRef } from 'react';
import ReactionButtons from '../components/ReactionButtons';

const generateDummyPosts = (page) => {
  return Array.from({ length: 10 }, (_, index) => ({
    id: page * 10 + index,
    title: `TOA 投稿 ${page * 10 + index}`,
    description: `この動画はTOAの世界を表現したものです。`,
    videoUrl: `https://www.w3schools.com/html/mov_bbb.mp4`,
    user: {
      name: `Creator_${page * 10 + index}`,
      avatar: `https://i.pravatar.cc/150?img=${(page * 10 + index) % 70}`,
    },
    stats: {
      likes: Math.floor(Math.random() * 10000),
      views: Math.floor(Math.random() * 50000),
    },
  }));
};

const Toppage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const videoRefs = useRef([]);

  const loadMore = () => {
    const newPosts = generateDummyPosts(page);
    if (newPosts.length === 0) {
      setHasMore(false);
      return;
    }

    // localStorageからの投稿を先頭に1回だけ追加
    const userPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    if (page === 1 && userPosts.length > 0) {
      setPosts([...userPosts, ...newPosts]);
    } else {
      setPosts((prev) => [...prev, ...newPosts]);
    }

    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    const center = document.getElementById('center-scroll');
    if (!center) return;

    const handleScroll = () => {
      const bottom = center.scrollTop + center.clientHeight >= center.scrollHeight - 200;
      if (bottom && hasMore) {
        loadMore();
      }
    };

    center.addEventListener('scroll', handleScroll);
    return () => center.removeEventListener('scroll', handleScroll);
  }, [hasMore, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [posts]);

  return (
    <div className="flex h-screen bg-white text-gray-900 font-sans">
      {/* 左サイドバー（PCのみ） */}
      <div className="hidden sm:block w-[20%] min-w-[200px] bg-white border-r border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-6">TOA Lounge</h2>
        <nav className="space-y-4 text-gray-600 font-medium">
          <div className="hover:text-blue-500 cursor-pointer">ホーム</div>
          <div className="hover:text-blue-500 cursor-pointer">検索</div>
          <div className="hover:text-blue-500 cursor-pointer">通知</div>
          <div className="hover:text-blue-500 cursor-pointer">設定</div>
        </nav>
      </div>

      {/* 中央スクロールエリア */}
      <div
        id="center-scroll"
        className="flex-1 overflow-y-scroll h-screen px-2 sm:px-6 py-8 bg-gray-50"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">タイムライン</h1>
        <div className="space-y-10">
          {posts.map((post, index) => (
            <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden relative">
              <div className="relative">
                <video
                  controls
                  muted
                  loop
                  playsInline
                  className="w-full h-72 sm:h-96 object-cover bg-black"
                  src={post.videoUrl}
                  ref={(el) => (videoRefs.current[index] = el)}
                />
                {/* PC用リアクションバブル */}
                <div className="hidden sm:flex absolute right-4 bottom-6 flex-col items-center gap-4 text-white text-sm">
                  <ReactionButtons post={post} vertical />
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex items-center mb-3">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">{post.user.name}</p>
                    <p className="text-xs text-gray-500">
                      {post.stats.views.toLocaleString()} views ・{' '}
                      {post.stats.likes.toLocaleString()} likes
                    </p>
                  </div>
                </div>
                <h2 className="text-lg font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm">{post.description}</p>
              </div>
            </div>
          ))}
        </div>
        {hasMore ? (
          <p className="text-center text-gray-400 mt-12">読み込み中...</p>
        ) : (
          <p className="text-center text-gray-400 mt-12">すべての投稿を表示しました</p>
        )}
      </div>

      {/* 右サイドバー（PCのみ） */}
      <div className="hidden sm:block w-[20%] min-w-[200px] bg-white border-l border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-6">おすすめ</h2>
        <div className="space-y-4 text-gray-700">
          <div className="hover:underline cursor-pointer">人気ユーザー</div>
          <div className="hover:underline cursor-pointer">トレンド</div>
          <div className="hover:underline cursor-pointer">新着クリップ</div>
        </div>
      </div>

      {/* スマホ用リアクションバブル */}
      <div className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/90 rounded-full px-6 py-2 flex gap-6 shadow-lg backdrop-blur-md z-50">
        {posts[0] && <ReactionButtons post={posts[0]} />}
      </div>
    </div>
  );
};

export default Toppage;