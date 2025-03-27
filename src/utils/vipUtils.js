// src/utils/vipUtils.js

import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * VIPポイント加算（チケット購入時など）
 * @param {string} userId - Firebase UID
 * @param {number} ticketCount - チケット枚数
 */
export const addVipPointsForTicketPurchase = async (userId, ticketCount) => {
  const pointsPerTicket = 10;
  const pointsToAdd = ticketCount * pointsPerTicket;

  const userRef = doc(db, 'vipPoints', userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    await updateDoc(userRef, {
      points: increment(pointsToAdd),
      lastUpdated: serverTimestamp(),
    });
  } else {
    await setDoc(userRef, {
      points: pointsToAdd,
      rank: 'Bronze',
      lastUpdated: serverTimestamp(),
    });
  }

  await checkAndUpdateVipRank(userId);
};

/**
 * VIPランクの判定・昇格処理
 */
export const checkAndUpdateVipRank = async (userId) => {
  const userRef = doc(db, 'vipPoints', userId);
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) return;

  const data = docSnap.data();
  const points = data.points || 0;

  let newRank = 'Bronze';
  if (points >= 10000) newRank = 'Platinum';
  else if (points >= 5000) newRank = 'Gold';
  else if (points >= 1000) newRank = 'Silver';

  if (data.rank !== newRank) {
    await updateDoc(userRef, { rank: newRank });
  }
};

/**
 * 現在のVIPランクを取得
 */
export const getUserVipRank = async (userId) => {
  const userRef = doc(db, 'vipPoints', userId);
  const snap = await getDoc(userRef);
  if (!snap.exists()) return 'Bronze';
  return snap.data().rank || 'Bronze';
};