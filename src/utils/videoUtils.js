// src/utils/videoUtils.js
import { auth } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export const isVipUser = async () => {
  const user = auth.currentUser;
  if (!user) return false;

  const snap = await getDoc(doc(db, 'users', user.uid));
  return snap.exists() && snap.data().vip === true;
};

export const hasPurchasedVideo = async (videoId) => {
  const user = auth.currentUser;
  if (!user) return false;

  const snap = await getDoc(doc(db, 'purchases', `${user.uid}_${videoId}`));
  return snap.exists();
};




  
  