// src/components/ui/VideoFilterBar.js

import React from "react";

const TAGS = ["ダンス", "料理", "ゲーム", "音楽", "Vlog"];
const CATEGORIES = ["すべて", "エンタメ", "ライフスタイル", "教育"];

const VideoFilterBar = ({
  selectedTags = [],
  setSelectedTags,
  selectedCategory = "すべて",
  setSelectedCategory,
}) => {
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="px-4 py-2 space-y-2 bg-white rounded-xl shadow-sm mb-4">
      <div className="space-x-2">
        {(CATEGORIES || []).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="space-x-2">
        {(TAGS || []).map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTags.includes(tag)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoFilterBar;



