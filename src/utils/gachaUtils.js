import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  setDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../firebase';

/**
 * 🎯 ガチャアイテム取得（default_gacha_2025 から）
 */
export const fetchGachaItems = async () => {
  const docRef = doc(db, 'gachaMasters', 'default_gacha_2025');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    console.log('🎯 ガチャアイテム取得:', data.items);
    return data.items || [];
  } else {
    console.warn('⚠️ ガチャマスターが存在しません');
    return [];
  }
};

/**
 * 🎯 ガチャ抽選処理
 */
export const drawGacha = async (items, count) => {
  if (!items || items.length === 0) {
    console.warn('⚠️ drawGacha: ガチャアイテムが無効または空です', items);
    throw new Error('ガチャアイテムがありません');
  }

  const results = [];
  const totalWeight = items.reduce((sum, item) => sum + (item.weight || 1), 0);

  for (let i = 0; i < count; i++) {
    const rand = Math.random() * totalWeight;
    let acc = 0;
    for (const item of items) {
      acc += item.weight || 1;
      if (rand <= acc) {
        results.push(item);
        break;
      }
    }
  }

  return results;
};

/**
 * 💾 ガチャ結果を保存
 */
export const saveGachaResult = async (userId, results) => {
  if (!userId || !results || results.length === 0) return;

  const historyRef = collection(db, 'gachaResults', userId, 'history');
  const saveData = {
    timestamp: new Date(),
    results,
  };

  await addDoc(historyRef, saveData);
};

/**
 * 📜 ガチャ履歴取得（最大10件）
 */
export const getGachaHistory = async (userId) => {
  if (!userId) return [];

  const historyRef = collection(db, 'gachaResults', userId, 'history');
  const q = query(historyRef, orderBy('timestamp', 'desc'), limit(10));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data());
};

/**
 * 🎫 チケット数取得（Firestoreから）
 */
export const fetchUserTicketCount = async (userId) => {
  console.log('🧾 fetchUserTicketCount:', userId);
  if (!userId) return 0;

  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    return data.gachaTickets ?? 0;
  } else {
    return 0;
  }
};

/**
 * 🎫 チケット数を消費（Firestore更新）
 */
export const consumeGachaTickets = async (userId, count) => {
  if (!userId || count <= 0) return;

  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) throw new Error('ユーザーが存在しません');

  const current = userSnap.data().gachaTickets ?? 0;
  const updated = current - count;

  if (updated < 0) throw new Error('チケットが不足しています');

  await updateDoc(userRef, { gachaTickets: updated });
  console.log(`✅ チケット更新: ${current} → ${updated}`);
};










