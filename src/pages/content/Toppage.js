import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
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
import HeaderMobile from '../../components/common/HeaderMobile';
import FooterMobile from '../../components/common/FooterMobile';
import TabSwitcher from '../../components/common/TabSwitcher';

const Toppage = () => {
  const [activeTab, setActiveTab] = useState('video');
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
        return visiblePosts.map((post, index) => (
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
    <div className="flex w-full min-h-screen bg-gray-50 text-black flex-col">
      {isMobile && (
        <HeaderMobile activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      <div className="flex flex-1 w-full">
        <aside className="hidden md:block md:w-1/5 p-4 bg-white shadow h-screen sticky top-0">
          <SidebarLeft />
        </aside>

        <main className="flex-1 p-4 pt-20 md:pt-4 space-y-4 overflow-y-auto">
          {/* 💙 Step 1: メニューパネル（上に表示） */}
          <MenuPanel />

          {/* 💙 Step 2: タブ切り替え（下に表示） */}
          {!isMobile && (
            <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
          )}

          {/* 💙 Step 3: 各タブのコンテンツ */}
          {renderTabContent()}
        </main>

        <aside className="hidden lg:block lg:w-1/5 p-4 bg-white shadow h-screen sticky top-0">
          <SidebarRight />
        </aside>
      </div>

      {isMobile && <FooterMobile />}
    </div>
  );
};

export default Toppage;


















