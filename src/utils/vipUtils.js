import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // ← 🔧 ここも修正済み！

/**
 * ユーザーのVIPステータスを取得（ランク・チケット）
 */
export const getUserVipStatus = async (userId) => {
  if (!userId) return { rank: 'Bronze', tickets: 0 };

  try {
    const ref = doc(db, 'vipStatus', userId);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      return { rank: 'Bronze', tickets: 0 };
    }

    const data = snap.data();
    return {
      rank: data.rank || 'Bronze',
      tickets: data.tickets || 0,
    };
  } catch (error) {
    console.error('VIPステータスの取得に失敗:', error);
    return { rank: 'Bronze', tickets: 0 };
  }
};

/**
 * ポイントに応じてVIPランクを判定し、変更があれば更新
 */
export const checkAndUpdateVipRank = async (userId) => {
  const ref = doc(db, 'vipStatus', userId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return 'Bronze';

  const data = snap.data();
  const points = data.points || 0;

  let rank = 'Bronze';
  if (points >= 1000) rank = 'Platinum';
  else if (points >= 500) rank = 'Gold';
  else if (points >= 100) rank = 'Silver';

  if (rank !== data.rank) {
    await updateDoc(ref, { rank });
  }

  return rank;
};

/**
 * VIPランクが12以上か判定（例：ディレクターズカット視聴などで使用）
 */
export const isVIP12OrHigher = (vipRank) => {
  return typeof vipRank === 'number' && vipRank >= 12;
};
