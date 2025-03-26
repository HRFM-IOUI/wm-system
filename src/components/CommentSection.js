// src/components/CommentSection.js
import React, { useState } from 'react';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');

  const handlePostComment = () => {
    if (input.trim() === '') return;
    const newComment = {
      id: Date.now(),
      text: input,
      user: 'デモユーザー',
    };
    setComments((prev) => [...prev, newComment]);
    setInput('');
  };

  return (
    <div className="bg-white p-4 rounded-md shadow mt-4 w-full">
      <h3 className="text-md font-semibold mb-2">コメント</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-2 text-sm">
            <p className="font-semibold">{comment.user}</p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="コメントを入力..."
          className="flex-1 px-3 py-2 border rounded-l-md text-sm"
        />
        <button
          onClick={handlePostComment}
          className="bg-pink-500 text-white px-4 py-2 rounded-r-md hover:bg-pink-600 text-sm"
        >
          投稿
        </button>
      </div>
    </div>
  );
};

export default CommentSection;