// src/pages/content/Toppage.js
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

const Toppage = () => {
  const [activeTab, setActiveTab] = useState('video');
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const observer = useRef();
  const videoRefs = useRef([]);
  const lastPostRef = useRef(null);

  const tabItems = [
    { key: 'video', label: 'メディア' },
    { key: 'goods', label: 'グッズ' },
    { key: 'gacha', label: 'ガチャ' },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(fetched);
      setVisiblePosts(fetched.slice(0, 5));
    };
    if (activeTab === 'video') fetchPosts();
  }, [activeTab]);

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
      case 'video':
        return (
          <>
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
          </>
        );
      case 'goods':
        return <DummyGoods />;
      case 'gacha':
        return <DummyGacha />;
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50 text-black">
      <aside className="hidden md:block md:w-1/5 p-4 bg-white shadow h-screen sticky top-0">
        <SidebarLeft />
      </aside>

      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        <MenuPanel />

        {/* タブ切り替え - X風スタイル */}
        <div className="flex border-b border-gray-300 mb-4">
          {tabItems.map(tab => (
            <button
              key={tab.key}
              className={`flex-1 pb-2 text-sm font-medium text-center border-b-2 transition-all duration-200 ease-in-out ${
                activeTab === tab.key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300'
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {renderTabContent()}
      </main>

      <aside className="hidden lg:block lg:w-1/5 p-4 bg-white shadow h-screen sticky top-0">
        <SidebarRight />
      </aside>
    </div>
  );
};

export default Toppage;














