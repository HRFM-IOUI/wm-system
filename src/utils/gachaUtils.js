import { collection, addDoc, getDocs, query, } from 'firebase/firestore';
import { db } from '../firebase';

// ✅ 常に100枚保持（プロト用途）
export const fetchUserTicketCount = async (userId) => {
  console.log('🧾 fetchUserTicketCount:', userId);
  return 100; // 常に100枚所持として扱う
};

// ✅ チケット消費はスキップ
export const consumeGachaTickets = async (userId, count) => {
  console.log('🚫 consumeGachaTickets: スキップ（プロトタイプ）');
};

// ✅ 仮のガチャアイテムデータ
export const fetchGachaItems = async () => {
  const items = [
    { id: '1', name: 'ゴールドコイン', rarity: 'N', imageUrl: '/sample1.png' },
    { id: '2', name: 'シルバーソード', rarity: 'R', imageUrl: '/sample2.png' },
    { id: '3', name: 'マジックスタッフ', rarity: 'SR', imageUrl: '/sample3.png' },
    { id: '4', name: 'ドラゴンアーマー', rarity: 'SSR', imageUrl: '/sample4.png' },
  ];
  return items;
};

// ✅ ランダム抽選
export const drawGacha = async (items, count) => {
  console.log('⚙️ drawGacha called. items:', items);
  if (!items || items.length === 0) {
    throw new Error('ガチャアイテムがありません');
  }

  const results = [];
  for (let i = 0; i < count; i++) {
    const item = items[Math.floor(Math.random() * items.length)];
    results.push(item);
  }
  return results;
};

// ✅ Firestoreに結果保存
export const saveGachaResult = async (userId, results) => {
  const historyRef = collection(db, `gachaResults/${userId}/history`);
  await addDoc(historyRef, {
    timestamp: new Date(),
    results,
  });
};

// ✅ 履歴取得（マイページ用）
export const getGachaHistory = async (userId) => {
  const q = query(collection(db, `gachaResults/${userId}/history`));
  const querySnapshot = await getDocs(q);
  const history = [];
  querySnapshot.forEach((doc) => {
    history.push({ id: doc.id, ...doc.data() });
  });
  return history;
};













