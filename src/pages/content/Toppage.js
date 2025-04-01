import React, { useEffect, useRef, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

import VideoPlayer from '../../components/video/VideoPlayer';
import ReactionButtons from '../../components/common/ReactionButtons';
import CommentSection from '../../components/common/CommentSection';
import MenuPanel from '../../components/common/MenuPanel';
import DummyGoods from '../../components/common/DummyGoods';
import DummyGacha from '../../components/common/DummyGacha';
import MainLayout from '../../components/common/MainLayout';

const Toppage = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const observer = useRef();
  const videoRefs = useRef([]);
  const lastPostRef = useRef(null);

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
            <div className="text-[11px] text-gray-500 mb-1">更新日: {post.createdAt?.toDate?.().toLocaleDateString() || '不明'}</div>
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
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="space-y-4">
        <MenuPanel />
        {renderTabContent()}
      </div>
    </MainLayout>
  );
};

export default Toppage;




















