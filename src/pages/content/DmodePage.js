// src/pages/content/DmodePage.js
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

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
import { getUserVipStatus } from '../../utils/vipUtils';

const DmodePage = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [vipContent, setVipContent] = useState([]);
  const [visibleVipContent, setVisibleVipContent] = useState([]);
  const [vipStatus, setVipStatus] = useState(null);
  const observer = useRef();
  const videoRefs = useRef([]);
  const lastPostRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchVipVideos = async () => {
      const q = query(
        collection(db, 'videos'),
        where('mode', '==', 'director'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVipContent(fetched);
      setVisibleVipContent(fetched.slice(0, 5));
    };
    if (user) fetchVipVideos();
  }, [user]);

  useEffect(() => {
    const loadVipStatus = async () => {
      if (user) {
        const status = await getUserVipStatus(user.uid);
        setVipStatus(status);
      }
    };
    loadVipStatus();
  }, [user]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisibleVipContent(prev => {
          const next = vipContent.slice(prev.length, prev.length + 5);
          return [...prev, ...next];
        });
      }
    });
    if (lastPostRef.current) observer.current.observe(lastPostRef.current);
  }, [visibleVipContent, vipContent]);

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
  }, [visibleVipContent]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'videos':
        return visibleVipContent.map((post, index) => (
          <div key={post.id} ref={index === visibleVipContent.length - 1 ? lastPostRef : null}>
            <VideoCard video={post} />
          </div>
        ));
      case 'goods':
        return <DummyGoods vip />;
      case 'gacha':
        return <DummyGacha vip />;
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

          {vipStatus && (
            <div className="bg-gradient-to-r from-pink-500 to-yellow-500 text-black p-4 rounded-xl shadow text-sm">
              <p className="font-bold">🎖️ VIPステータス</p>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>現在のランク: <strong>{vipStatus.rank}</strong></li>
                <li>累計ログイン日数: {vipStatus.streak}日</li>
                <li>保有VIPポイント: {vipStatus.points}pt</li>
              </ul>
            </div>
          )}

          <MenuPanel isDmode />

          {isDesktop && (
            <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
          )}

          {renderTabContent()}
        </main>

        <aside className="hidden lg:block lg:w-1/5 bg-white p-4 h-screen sticky top-0">
          <SidebarRight />
        </aside>
      </div>

      {isMobile && (
        <FooterTabMobile activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
};

export default DmodePage;








