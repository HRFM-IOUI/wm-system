import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

// コメントを投稿
export const addComment = async (videoId, userId, username, text) => {
  if (!text.trim()) return;
  await addDoc(collection(db, "comments"), {
    videoId,
    userId,
    username,
    text,
    createdAt: serverTimestamp(),
  });
};

// 指定動画のコメント一覧を取得
export const fetchComments = async (videoId) => {
  const q = query(
    collection(db, "comments"),
    where("videoId", "==", videoId),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// コメント削除（自分のコメントのみ）
export const deleteComment = async (commentId) => {
  await deleteDoc(doc(db, "comments", commentId));
};

  
  
  