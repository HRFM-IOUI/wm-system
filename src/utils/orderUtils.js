// src/utils/orderUtils.js
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * 特定ユーザーが特定の商品を購入済みか確認する
 */
export const hasPurchasedProduct = async (userId, productId) => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      where('productId', '==', productId),
      where('status', '==', 'paid')
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    console.error('購入チェック失敗:', error);
    return false;
  }
};
