import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const CommentModal = ({ isOpen, onClose, videoId, user }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    await addDoc(collection(db, 'videos', videoId, 'comments'), {
      text: comment,
      createdAt: serverTimestamp(),
      userId: user?.uid,
      userName: user?.displayName || '匿名',
    });

    setComment('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div className="bg-white rounded-xl p-6 z-10 max-w-md w-full">
        <Dialog.Title className="text-lg font-bold mb-2">コメントを投稿</Dialog.Title>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="コメントを書く..."
          className="w-full border border-gray-300 p-2 rounded-md"
        />
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 px-4 py-2 rounded bg-gray-300">キャンセル</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded bg-blue-500 text-white">投稿</button>
        </div>
      </div>
    </Dialog>
  );
};

export default CommentModal;



