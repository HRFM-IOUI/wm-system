// src/utils/gachaUtils.js
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

// ガチャアイテム取得
export const fetchGachaItems = async () => {
  return [
    { id: '1', name: 'ピンクベア', rarity: 'common', image: '/images/item1.png' },
    { id: '2', name: 'ブルードラゴン', rarity: 'rare', image: '/images/item2.png' },
    { id: '3', name: 'ゴールドナイト', rarity: 'epic', image: '/images/item3.png' },
  ];
};

// 抽選
export const drawGacha = async (items, count) => {
  if (!items || items.length === 0) throw new Error('ガチャアイテムがありません');
  const results = [];
  for (let i = 0; i < count; i++) {
    const item = items[Math.floor(Math.random() * items.length)];
    results.push(item);
  }
  return results;
};

// 保存
export const saveGachaResult = async (userId, results) => {
  const historyRef = collection(db, `gachaResults/${userId}/history`);
  for (const result of results) {
    await addDoc(historyRef, {
      ...result,
      timestamp: Timestamp.now(),
    });
  }
};

// チケット取得
export const fetchUserTicketCount = async (userId) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data().tickets || 0 : 0;
};

// チケット消費
export const consumeGachaTickets = async (userId, count) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) throw new Error('ユーザーが見つかりません');
  const current = userSnap.data().tickets || 0;
  if (current < count) throw new Error('チケットが不足しています');
  await updateDoc(userRef, { tickets: current - count });
};

// ✅ 追加：履歴取得（ビルドエラー対策）
export const getGachaHistory = async (userId) => {
  const historyRef = collection(db, `gachaResults/${userId}/history`);
  const q = query(historyRef, orderBy('timestamp', 'desc'), limit(10));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};












