import React, { useState, useEffect, useRef } from 'react';

// ダミー投稿を生成（ダミー10件ずつ）
const generateDummyPosts = (page) => {
  return Array.from({ length: 10 }, (_, index) => ({
    id: `dummy-${page * 10 + index}`,
    type: 'video',
    title: `ダミー投稿 ${page * 10 + index}`,
    description: `これはダミーの投稿です（開発用）`,
    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    isPublic: true,
    user: {
      name: `Guest_${page * 10 + index}`,
      avatar: `https://i.pravatar.cc/150?img=${(page * 10 + index) % 70}`,
    },
    stats: {
      likes: Math.floor(Math.random() * 500),
      views: Math.floor(Math.random() * 2000),
    },
  }));
};

const Toppage = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const videoRefs = useRef([]);

  // 初回読み込み時：ダミーとlocalStorageの公開投稿を読み込む
  useEffect(() => {
    const publicPosts = JSON.parse(localStorage.getItem('posts') || '[]').filter(
      (p) => p.isPublic
    );
    const dummyPosts = generateDummyPosts(1);
    setPosts([...publicPosts, ...dummyPosts]);
    setPage(2);
  }, []);

  // 無限スクロール
  useEffect(() => {
    const scrollContainer = document.getElementById('center-scroll');
    const handleScroll = () => {
      if (
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight - 200
      ) {
        const newPosts = generateDummyPosts(page);
        setPosts((prev) => [...prev, ...newPosts]);
        setPage((prev) => prev + 1);
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [page]);

  // 再生コントロール（IntersectionObserver）
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
      {/* 左サイドバー */}
      <div className="hidden sm:block w-[20%] min-w-[200px] bg-white border-r border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-6">TOA</h2>
        <nav className="space-y-4 text-gray-600 font-medium">
          <div className="hover:text-blue-500 cursor-pointer">ホーム</div>
          <div className="hover:text-blue-500 cursor-pointer">検索</div>
          <div className="hover:text-blue-500 cursor-pointer">通知</div>
        </nav>
      </div>

      {/* 中央スクロールコンテナ */}
      <div
        id="center-scroll"
        className="flex-1 overflow-y-scroll h-screen px-2 sm:px-6 py-8 bg-gray-50"
      >
        <h1 className="text-2xl font-bold text-center mb-6">タイムライン</h1>
        <div className="space-y-10">
          {posts.map((post, index) => (
            <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* メディア表示 */}
              {post.type === 'image' && (
                <img src={post.mediaUrl} alt="" className="w-full object-cover" />
              )}
              {post.type === 'video' && (
                <video
                  src={post.mediaUrl}
                  controls
                  muted
                  loop
                  playsInline
                  className="w-full object-cover bg-black h-72 sm:h-96"
                  ref={(el) => (videoRefs.current[index] = el)}
                />
              )}
              {post.type === 'text' && (
                <div className="p-6 text-lg">{post.description}</div>
              )}

              {/* 投稿情報 */}
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
                      {post.stats?.views?.toLocaleString() || 0} views ・{' '}
                      {post.stats?.likes?.toLocaleString() || 0} likes
                    </p>
                  </div>
                </div>
                <h2 className="text-lg font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm">{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 右サイドバー */}
      <div className="hidden sm:block w-[20%] min-w-[200px] bg-white border-l border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-6">おすすめ</h2>
        <div className="space-y-4 text-gray-700">
          <div className="hover:underline cursor-pointer">人気ユーザー</div>
          <div className="hover:underline cursor-pointer">トレンド</div>
        </div>
      </div>
    </div>
  );
};

export default Toppage;