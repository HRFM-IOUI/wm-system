import { db } from '../firebase';
import { collection, query, where, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';

// 公開動画のみを取得
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

// いいね数取得
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

// ID指定で1件の動画を取得
export const getVideoById = async (videoId) => {
  try {
    const docRef = doc(db, 'videos', videoId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('動画取得に失敗:', error);
    return null;
  }
};

// 単品購入済みかどうかチェック
export const checkUserHasPurchasedVideo = async (userId, videoId) => {
  try {
    const ref = doc(db, `videos/${videoId}/purchases/${userId}`);
    const snap = await getDoc(ref);
    return snap.exists();
  } catch (error) {
    console.error('購入チェックエラー:', error);
    return false;
  }
};

// 単品購入を記録
export const recordVideoPurchase = async (userId, videoId) => {
  try {
    const ref = doc(db, `videos/${videoId}/purchases/${userId}`);
    await setDoc(ref, {
      purchasedAt: new Date(),
    });
    return true;
  } catch (error) {
    console.error('購入記録エラー:', error);
    return false;
  }
};




  
  