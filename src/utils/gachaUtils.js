// src/utils/gachaUtils.js
import { db } from '../firebase';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  Timestamp,
} from 'firebase/firestore';

// ガチャアイテム取得（Firestoreから）
export const fetchGachaItems = async (gachaId = 'default_gacha_2025') => {
  const gachaDocRef = doc(db, 'gachaMasters', gachaId);
  const gachaDocSnap = await getDoc(gachaDocRef);

  if (!gachaDocSnap.exists()) {
    throw new Error('ガチャデータが存在しません。');
  }

  const gachaData = gachaDocSnap.data();
  const items = gachaData.items;

  if (!items || !Array.isArray(items)) {
    throw new Error('ガチャアイテムが正しく取得できませんでした。Firestoreの items フィールドを確認してください。');
  }

  return items;
};

// 重み付け抽選
const weightedRandom = (items) => {
  const totalWeight = items.reduce((acc, item) => acc + item.weight, 0);
  const rand = Math.random() * totalWeight;
  let sum = 0;
  for (const item of items) {
    sum += item.weight;
    if (rand < sum) {
      return item;
    }
  }
  return items[items.length - 1];
};

// ガチャ実行
export const drawGacha = async (count = 1, gachaId = 'default_gacha_2025') => {
  const items = await fetchGachaItems(gachaId);
  const results = [];

  for (let i = 0; i < count; i++) {
    results.push(weightedRandom(items));
  }

  return results;
};

// ガチャ結果保存
export const saveGachaResult = async (userId, results) => {
  const historyRef = collection(db, `gachaResults/${userId}/history`);
  await addDoc(historyRef, {
    results,
    createdAt: Timestamp.now(),
  });
};

// ガチャ履歴取得
export const getGachaHistory = async (userId) => {
  const historyRef = collection(db, `gachaResults/${userId}/history`);
  const historySnap = await getDoc(historyRef);
  return historySnap.exists() ? historySnap.data() : [];
};
