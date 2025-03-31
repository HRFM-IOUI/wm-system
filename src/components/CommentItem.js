import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../hooks/useAuth";
import { format } from "date-fns";

export default function CommentItem({ comment, videoId }) {
  const { user } = useAuth();

  const handleDelete = async () => {
    if (!user || user.uid !== comment.userId) return;
    const confirmDelete = window.confirm("このコメントを削除しますか？");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "videos", videoId, "comments", comment.id));
    } catch (error) {
      console.error("コメント削除エラー:", error);
    }
  };

  return (
    <div className="border rounded-lg p-2 bg-white shadow">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-semibold">{comment.userName || "ユーザー"}</p>
          <p className="text-xs text-gray-500">
            {comment.createdAt?.toDate
              ? format(comment.createdAt.toDate(), "yyyy/MM/dd HH:mm")
              : ""}
          </p>
        </div>
        {user?.uid === comment.userId && (
          <button
            onClick={handleDelete}
            className="text-xs text-red-500 hover:underline"
          >
            削除
          </button>
        )}
      </div>
      <p className="mt-1 text-sm">{comment.text}</p>
    </div>
  );
}


