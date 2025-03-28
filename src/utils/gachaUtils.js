import { db } from '../firebase';
import {
  collection,
  getDoc,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

/**
 * Firestore の default_gacha_2025 ドキュメントから items を配列として取得
 */
export const fetchGachaItems = async () => {
  try {
    const docRef = doc(db, 'gachaMasters', 'default_gacha_2025');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const itemsObj = data.items || {};

      const itemsArray = Object.values(itemsObj).map((item, index) => ({
        id: index,
        ...item,
      }));

      return itemsArray;
    } else {
      console.error('default_gacha_2025 ドキュメントが存在しません');
      return [];
    }
  } catch (error) {
    console.error('ガチャアイテムの取得エラー:', error);
    return [];
  }
};

/**
 * 簡易ガチャロジック（重み付け）
 */
export const drawGacha = (items, count) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('ガチャアイテムがありません');
  }

  const results = [];

  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

  for (let i = 0; i < count; i++) {
    const rand = Math.random() * totalWeight;
    let acc = 0;

    for (const item of items) {
      acc += item.weight;
      if (rand <= acc) {
        results.push(item);
        break;
      }
    }
  }

  return results;
};

/**
 * Firestore にガチャ結果を保存
 */
export const saveGachaResult = async (userId, results) => {
  const timestamp = Date.now();
  const historyRef = doc(db, `gachaResults/${userId}/history/${timestamp}`);

  await setDoc(historyRef, {
    results,
    createdAt: serverTimestamp(),
  });
};

/**
 * マイページで表示するガチャ履歴取得（最新10件）
 */
export const getGachaHistory = async (userId) => {
  const resultsRef = collection(db, `gachaResults/${userId}/history`);
  const snapshot = await getDocs(resultsRef);

  const history = [];
  snapshot.forEach((doc) => {
    history.push({ id: doc.id, ...doc.data() });
  });

  // 日付で並べ替え（新着順）
  return history.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds).slice(0, 10);
};


