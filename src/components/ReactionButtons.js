import React from 'react';

const ReactionButtons = ({ post }) => {
  const handleLike = () => {
    console.log(`Liked post ${post.id}`);
  };

  const handleComment = () => {
    console.log(`Comment on post ${post.id}`);
  };

  const handleShare = () => {
    console.log(`Share post ${post.id}`);
  };

  return (
    <div className="flex justify-around items-center mt-2 text-gray-600 text-sm">
      <button
        onClick={handleLike}
        className="hover:text-pink-500 transition"
        aria-label="Like"
      >
        ❤️ いいね
      </button>
      <button
        onClick={handleComment}
        className="hover:text-blue-500 transition"
        aria-label="Comment"
      >
        💬 コメント
      </button>
      <button
        onClick={handleShare}
        className="hover:text-green-500 transition"
        aria-label="Share"
      >
        🔁 シェア
      </button>
    </div>
  );
};

export default ReactionButtons;