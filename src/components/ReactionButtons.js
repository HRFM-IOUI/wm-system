import React from 'react';

const ReactionButtons = ({ post, vertical = false }) => {
  const layout = vertical ? 'flex-col items-center' : 'flex-row items-center gap-4';
  const iconSize = vertical ? 'h-6 w-6' : 'h-5 w-5';

  return (
    <div className={`flex ${layout} text-sm text-gray-700`}>
      <button className="flex flex-col items-center hover:scale-110 transition-transform">
        <svg className={`${iconSize} text-pink-500`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
        <span className="text-xs">{post.stats.likes}</span>
      </button>

      <button className="flex flex-col items-center hover:scale-110 transition-transform">
        <svg className={`${iconSize} text-blue-400`} fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0-4.418-4.03-8-9-8S3 7.582 3 12s4.03 8 9 8 9-3.582 9-8z" />
        </svg>
        <span className="text-xs">123</span>
      </button>

      <button className="flex flex-col items-center hover:scale-110 transition-transform">
        <svg className={`${iconSize} text-yellow-400`} fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M5 5v14l7-7 7 7V5H5z" />
        </svg>
        <span className="text-xs">保存</span>
      </button>

      <button className="flex flex-col items-center hover:scale-110 transition-transform">
        <svg className={`${iconSize} text-green-400`} fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M15 8a3 3 0 00-6 0m6 0a3 3 0 01-6 0m6 0v10m-6 0v-6m6 0H9" />
        </svg>
        <span className="text-xs">共有</span>
      </button>
    </div>
  );
};

export default ReactionButtons;