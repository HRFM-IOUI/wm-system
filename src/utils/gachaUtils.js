import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../firebase';

/**
 * ガチャアイテムを取得（タイプ別対応）
 */
export const fetchGachaItems = async (type = 'default') => {
  const targetCollection = type ? `gachaItems_${type}` : 'gachaItems';
  const querySnapshot = await getDocs(collection(db, targetCollection));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * ガチャ抽選処理（5%で1等サブスク）
 */
export const drawGacha = async (items, count = 1) => {
  const results = [];
  for (let i = 0; i < count; i++) {
    const chance = Math.random() * 100;
    if (chance < 5) {
      results.push({ name: '1等サブスク1ヶ月無料', type: 'subscription' });
    } else if (Array.isArray(items) && items.length > 0) {
      const index = Math.floor(Math.random() * items.length);
      results.push(items[index]);
    } else {
      results.push({ name: 'はずれ', type: 'none' });
    }
  }
  return results;
};

/**
 * ガチャ結果を保存
 */
export const saveGachaResult = async (userId, results) => {
  const historyCollection = collection(db, `gachaResults/${userId}/history`);
  await addDoc(historyCollection, {
    results,
    timestamp: new Date()
  });
};

/**
 * ガチャ履歴を取得
 */
export const getGachaHistory = async (userId, maxItems = 10) => {
  const historyRef = collection(db, `gachaResults/${userId}/history`);
  const q = query(historyRef, orderBy('timestamp', 'desc'), limit(maxItems));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};






















