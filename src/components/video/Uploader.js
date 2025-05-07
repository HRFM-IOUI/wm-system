// src/components/video/Uploader.js
import React, { useState } from 'react';
import {
  createVideoInBunny,
  uploadVideoToBunny,
} from '../../utils/bunnyUtils';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../firebase';

const Uploader = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('sample');
  const [category, setCategory] = useState('その他');
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const categoryOptions = [
    'AV',
    'コスプレ',
    '美少女',
    '人妻',
    '素人',
    'ディレクターズカット',
    'その他',
  ];

  const handleUpload = async () => {
    if (!title || !file) {
      alert('タイトルと動画を入力してください');
      return;
    }

    try {
      setUploading(true);
      setMessage('動画を作成中...');
      const videoMeta = await createVideoInBunny(title);
      const guid = videoMeta.guid;

      setMessage('アップロード中...');
      await uploadVideoToBunny(guid, file, (e) => {
        const percent = Math.round((e.loaded * 100) / e.total);
        setProgress(percent);
      });

      const user = auth.currentUser;
      const docRef = doc(db, 'videos', guid);
      await setDoc(docRef, {
        guid,
        title,
        description,
        type,
        category,
        userId: user?.uid || 'unknown',
        isPublic: true,
        createdAt: serverTimestamp(),
      });

      setMessage('アップロード完了！');
      setTitle('');
      setDescription('');
      setType('sample');
      setCategory('その他');
      setFile(null);
      setProgress(0);
    } catch (err) {
      console.error(err);
      setMessage('アップロードに失敗しました');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow-md bg-white space-y-4">
      <h2 className="text-lg font-semibold">動画アップロード</h2>

      <input
        type="text"
        placeholder="タイトル"
        className="border p-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="動画の説明"
        className="border p-2 w-full"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">投稿タイプ</label>
          <select
            className="border p-2 w-full"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="sample">① サンプル</option>
            <option value="main">② 本編</option>
            <option value="dmode">③ ディレクターズカット</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">カテゴリ</label>
          <select
            className="border p-2 w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <input
        type="file"
        accept="video/*"
        className="border p-2 w-full"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {uploading && (
        <div className="w-full bg-gray-200 h-4 rounded">
          <div
            className="bg-pink-500 h-4 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
      >
        アップロード
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
};

export default Uploader;





















