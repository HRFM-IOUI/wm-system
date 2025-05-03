// src/pages/content/Toppage.js
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useSearchParams } from 'react-router-dom';

import SidebarLeft from '../../components/common/SidebarLeft';
import SidebarRight from '../../components/common/SidebarRight';
import MenuPanel from '../../components/common/MenuPanel';
import DummyGoods from '../../components/common/DummyGoods';
import DummyGacha from '../../components/common/DummyGacha';
import FooterTabMobile from '../../components/common/FooterTabMobile';
import HeaderMobile from '../../components/common/HeaderMobile';
import TabSwitcher from '../../components/common/TabSwitcher';
import VideoCard from '../../components/VideoCard';
import { useMediaQuery } from 'react-responsive';
import DailyBonusBanner from '../../components/ui/DailyBonusBanner';

const Toppage = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('videos');
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const observer = useRef();
  const videoRefs = useRef([]);
  const lastPostRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'goods' || tab === 'gacha') {
      setActiveTab(tab);
    } else {
      setActiveTab('videos');
    }
  }, [searchParams]);

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
          const next = filteredPosts.slice(prev.length, prev.length + 5);
          return [...prev, ...next];
        });
      }
    });
    if (lastPostRef.current) observer.current.observe(lastPostRef.current);
  }, [visiblePosts, posts, selectedTag]);

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

  const filteredPosts = selectedTag
    ? posts.filter(post => Array.isArray(post.tags) && post.tags.includes(selectedTag))
    : posts;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'videos':
        return filteredPosts.slice(0, visiblePosts.length).map((post, index) => (
          <div key={post.id} ref={index === visiblePosts.length - 1 ? lastPostRef : null}>
            <VideoCard video={post} />
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
      {isMobile && (
        <HeaderMobile activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      <div className="flex flex-1">
        <aside className="hidden md:block md:w-1/5 bg-white p-4 h-screen sticky top-0">
          <SidebarLeft />
        </aside>

        <main className="flex-1 overflow-y-auto px-4 pb-20 pt-[64px] space-y-4">
          <DailyBonusBanner />
          <MenuPanel />
          {isDesktop && (
            <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
          {renderTabContent()}
        </main>

        <aside className="hidden lg:block lg:w-1/5 bg-white p-4 h-screen sticky top-0">
          <SidebarRight onTagSelect={setSelectedTag} />
        </aside>
      </div>

      {isMobile && (
        <FooterTabMobile activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
};

export default Toppage;





































