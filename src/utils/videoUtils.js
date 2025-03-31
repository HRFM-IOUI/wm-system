// src/utils/videoUtils.js

import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

// 公開動画のみを取得（今後のフィルターやタグに対応しやすく設計）
export const fetchPublicVideos = async () => {
  try {
    const q = query(collection(db, 'videos'), where('isPrivate', '==', false));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('動画の取得に失敗しました', error);
    return [];
  }
};

// 動画ごとのコメント数取得
export const fetchCommentCount = async (videoId) => {
  try {
    const q = query(collection(db, `videos/${videoId}/comments`));
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error('コメント数取得エラー:', error);
    return 0;
  }
};

// 動画ごとのいいね数取得（今後のリアクション対応も可能）
export const fetchLikeCount = async (videoId) => {
  try {
    const q = query(collection(db, `videos/${videoId}/likes`));
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error('いいね数取得エラー:', error);
    return 0;
  }
};


  
  