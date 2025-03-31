import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import CommentItem from "../../CommentItem";

export default function CommentList({ videoId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!videoId) return;

    const q = query(
      collection(db, "videos", videoId, "comments"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [videoId]);

  return (
    <div className="space-y-3 mt-4">
      {comments.length === 0 && (
        <div className="text-sm text-gray-500">コメントはまだありません。</div>
      )}
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} videoId={videoId} />
      ))}
    </div>
  );
}

