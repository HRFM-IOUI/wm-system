// src/utils/gachaUtils.js
// ガチャ抽選ロジック、1等5%判定など。

import { db } from '../firebase';
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

/**
 * ガチャアイテムを取得（タイプ別対応）
 */
export const fetchGachaItems = async (type = 'default') => {
  // 例： gachaItems_vip, gachaItems_1in50, etc.
  const targetCollection = type ? `gachaItems_${type}` : 'gachaItems';
  const querySnapshot = await getDocs(collection(db, targetCollection));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * ガチャ抽選処理
 * @param {Array} items ガチャアイテム
 * @param {number} count 回数
 * @param {string} userId ユーザーID
 * @returns {Array} 結果配列
 */
export const drawGacha = async (items, count = 1, userId) => {
  // ここで 5% で1等サブスク当選 or はずれ の簡易抽選
  // 1等アイテムは item = { name: 'サブスク無料', type: 'subscription' } など

  if (!Array.isArray(items) || items.length === 0) {
    // アイテムが設定されていない場合、5%で当たり or はずれアイテム
    return Array(count).fill({ name: 'はずれ', type: 'none' });
  }

  const results = [];
  for (let i = 0; i < count; i++) {
    // 5%判定
    const random = Math.random() * 100;
    if (random < 5) {
      results.push({ name: '1等サブスク1ヶ月無料', type: 'subscription' });
    } else {
      // 通常：アイテム配列から適当に1件
      const randomIndex = Math.floor(Math.random() * items.length);
      results.push(items[randomIndex]);
    }
  }

  return results;
};

/**
 * ガチャ結果を保存
 */
export const saveGachaResult = async (userId, results) => {
  const timestamp = new Date();
  const historyCollection = collection(db, `gachaResults/${userId}/history`);
  await addDoc(historyCollection, {
    results,
    timestamp,
  });
};

/**
 * ガチャ履歴を取得（最大 maxItems 件）
 */
export const getGachaHistory = async (userId, maxItems = 10) => {
  const historyRef = collection(db, `gachaResults/${userId}/history`);
  const q = query(historyRef, orderBy('timestamp', 'desc'), limit(maxItems));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data());
};





















