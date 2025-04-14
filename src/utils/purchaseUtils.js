// utils/purchaseUtils.js
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

/**
 * 指定ユーザーが指定動画を購入済みか確認
 * @param {string} userId
 * @param {string} videoId
 * @returns {Promise<boolean>}
 */
export const hasPurchasedVideo = async (userId, videoId) => {
  try {
    const docRef = doc(db, `users/${userId}/purchases`, videoId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error('購入確認エラー:', error);
    return false;
  }
};
