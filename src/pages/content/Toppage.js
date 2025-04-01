import React, { useEffect, useRef, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

import VideoPlayer from '../../components/video/VideoPlayer';
import ReactionButtons from '../../components/common/ReactionButtons';
import CommentSection from '../../components/common/CommentSection';
import SidebarLeft from '../../components/common/SidebarLeft';
import SidebarRight from '../../components/common/SidebarRight';
import MenuPanel from '../../components/common/MenuPanel';
import DummyGoods from '../../components/common/DummyGoods';
import DummyGacha from '../../components/common/DummyGacha';
import FooterTabMobile from '../../components/common/FooterTabMobile';
import HeaderMobile from '../../components/common/HeaderMobile';
import { useMediaQuery } from 'react-responsive';

const Toppage = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const observer = useRef();
  const videoRefs = useRef([]);
  const lastPostRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

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
    if (lastPostRef.current) observer.current.observe(lastPostRef.current);
  }, [visiblePosts, posts]);

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
    videoRefs.current.forEach(video => video && observer.observe(video));
    return () => observer.disconnect();
  }, [visiblePosts]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'videos':
        return visiblePosts.map((post, index) => (
          <div
            key={post.id}
            ref={index === visiblePosts.length - 1 ? lastPostRef : null}
            className="bg-white shadow rounded-lg p-4"
          >
            <div className="text-xs text-pink-500 font-bold mb-1">🎉 New Arrival!!</div>
            <div className="text-[11px] text-gray-500 mb-1">
              更新日: {post.createdAt?.toDate?.().toLocaleDateString() || '不明'}
            </div>
            <div className="text-xs text-gray-400 mb-2">#タグ #カテゴリ</div>
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
        ));
      case 'goods':
        return <DummyGoods />;
      case 'gacha':
        return <DummyGacha />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-black">
      {isMobile && <HeaderMobile activeTab={activeTab} setActiveTab={setActiveTab} />}

      <div className="flex flex-1">
        {/* 左サイドバー */}
        <aside className="hidden md:block md:w-1/5 bg-white p-4 h-screen sticky top-0">
          <SidebarLeft />
        </aside>

        {/* 中央カラム（スクロール対象） */}
        <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <MenuPanel />

          {/* PC表示用タブ */}
          {!isMobile && (
            <div className="flex space-x-4 mb-4">
              <button
                className={`px-4 py-2 rounded-full text-sm font-semibold ${activeTab === 'videos' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setActiveTab('videos')}
              >
                メディア
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-semibold ${activeTab === 'goods' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setActiveTab('goods')}
              >
                グッズ
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-semibold ${activeTab === 'gacha' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setActiveTab('gacha')}
              >
                ガチャ
              </button>
            </div>
          )}

          {renderTabContent()}
        </main>

        {/* 右サイドバー */}
        <aside className="hidden lg:block lg:w-1/5 bg-white p-4 h-screen sticky top-0">
          <SidebarRight />
        </aside>
      </div>

      {isMobile && <FooterTabMobile activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  );
};

export default Toppage;



























