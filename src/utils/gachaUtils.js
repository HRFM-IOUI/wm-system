import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../firebase'; // ✅ 修正済みパス

// 🎯 ガチャアイテムを取得（タイプ別対応）
export const fetchGachaItems = async (type = 'default') => {
  const targetCollection = type ? `gachaItems_${type}` : 'gachaItems';
  const querySnapshot = await getDocs(collection(db, targetCollection));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// 🎫 ユーザーのチケット数を取得
export const fetchUserTicketCount = async (userId) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    return data.tickets || 0;
  } else {
    await setDoc(userRef, { tickets: 100 });
    return 100;
  }
};

// 🎫 チケット消費
export const consumeGachaTickets = async (userId, count) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    const current = data.tickets || 0;

    if (current < count) throw new Error('チケットが不足しています');

    await updateDoc(userRef, { tickets: current - count });
  } else {
    throw new Error('ユーザー情報が存在しません');
  }
};

// 🎰 ガチャを回す処理（ランダム抽選）
export const drawGacha = async (items, count) => {
  if (!Array.isArray(items) || items.length === 0) return [];

  const results = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * items.length);
    results.push(items[randomIndex]);
  }
  return results;
};

// 📦 ガチャ結果を保存
export const saveGachaResult = async (userId, results) => {
  const timestamp = new Date();

  const historyCollection = collection(db, `gachaResults/${userId}/history`);
  await addDoc(historyCollection, {
    results,
    timestamp,
  });
};

// 📖 ガチャ履歴を取得（最大 maxItems 件）
export const getGachaHistory = async (userId, maxItems = 10) => {
  const historyRef = collection(db, `gachaResults/${userId}/history`);
  const q = query(historyRef, orderBy('timestamp', 'desc'), limit(maxItems));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data());
};




















