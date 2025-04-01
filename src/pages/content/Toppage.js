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
            className="bg-white/80 backdrop-blur-lg shadow rounded-2xl p-4 transition-all duration-300 ease-in-out transform hover:scale-[1.015] hover:ring-2 hover:ring-pink-400/40 hover:shadow-xl"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-semibold text-pink-600 truncate">{post.title}</h3>
              <span className="text-[11px] text-gray-400">
                {post.createdAt?.toDate?.().toLocaleDateString() || '不明'}
              </span>
            </div>
            <div className="flex flex-wrap gap-1 text-[10px] text-gray-400 mb-2">
              <span>#動画</span>
              <span>#カテゴリ</span>
            </div>
            {post.playbackUrl ? (
              <VideoPlayer
                playbackUrl={post.playbackUrl}
                ref={(el) => (videoRefs.current[index] = el)}
              />
            ) : (
              <div className="bg-gray-200 h-60 rounded" />
            )}
            <div className="mt-2">
              <ReactionButtons postId={post.id} />
              <CommentSection postId={post.id} />
            </div>
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
        <aside className="hidden md:block md:w-1/5 bg-white p-4 h-screen sticky top-0">
          <SidebarLeft />
        </aside>
        <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <MenuPanel />
          {renderTabContent()}
        </main>
        <aside className="hidden lg:block lg:w-1/5 bg-white p-4 h-screen sticky top-0">
          <SidebarRight />
        </aside>
      </div>
      {isMobile && <FooterTabMobile activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  );
};

export default Toppage;



























