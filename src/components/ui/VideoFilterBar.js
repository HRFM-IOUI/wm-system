
// src/components/ui/VideoFilterBar.js
import React, { useEffect, useState } from 'react';

const VideoFilterBar = ({ filter, setFilter }) => {
  const [categories, setCategories] = useState(['サンプル', 'イベント', 'ドキュメンタリー']);
  const [tags, setTags] = useState(['感動', '人気', '限定']);

  useEffect(() => {
    // 本来は動的取得の想定。ここではダミー値を使用。
  }, []);

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select
        value={filter.category}
        onChange={e => setFilter(prev => ({ ...prev, category: e.target.value }))}
        className="p-2 border rounded"
      >
        <option value="">カテゴリ選択</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <select
        value={filter.tag}
        onChange={e => setFilter(prev => ({ ...prev, tag: e.target.value }))}
        className="p-2 border rounded"
      >
        <option value="">タグ選択</option>
        {tags.map(tag => (
          <option key={tag} value={tag}>{tag}</option>
        ))}
      </select>

      {(filter.category || filter.tag) && (
        <button
          onClick={() => setFilter({ category: '', tag: '' })}
          className="text-sm text-pink-600 hover:underline"
        >
          フィルター解除
        </button>
      )}
    </div>
  );
};

export default VideoFilterBar;
