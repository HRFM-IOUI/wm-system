import React, { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../firebase';

const Uploader = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('sample');
  const [category, setCategory] = useState('その他');
  const [price, setPrice] = useState('1000');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const categoryOptions = [
    "女子高生", "合法jk", "jk", "幼児体型", "幼児服", "ロリ", "未○年", "素人", "ハメ撮り", "個人撮影",
    "色白", "細身", "巨乳", "パイパン", "ガキ", "メスガキ", "お仕置き", "レイプ", "中出し",
    "コスプレ", "制服", "学生", "華奢", "孕ませ", "ディレクターズカット", "その他", "本編"
  ];

  const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);

  const handleUpload = async () => {
    if (!title || !file) {
      alert('タイトルと動画を入力してください');
      return;
    }

    try {
      setUploading(true);
      setMessage('アップロードURLを取得中...');

      const metaRes = await fetch('https://s3-upload.ik39-10vevic.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });

      const data = await metaRes.json();
      if (!metaRes.ok) throw new Error(data.error || 'アップロードURL取得失敗');

      const s3FormData = new FormData();
      Object.entries(data.fields).forEach(([key, value]) => {
        s3FormData.append(key, value);
      });
      s3FormData.append('file', file);

      const uploadRes = await fetch(data.url, {
        method: 'POST',
        body: s3FormData,
      });

      if (!uploadRes.ok) throw new Error('S3アップロード失敗');

      const videoUrl = `${data.url}${data.fields.key}`;
      const user = auth.currentUser;
      if (!user) throw new Error('ログインが必要です');

      const id = crypto.randomUUID();
      await setDoc(doc(db, 'videos', id), {
        id,
        title,
        description,
        type,
        category,
        price: parseInt(price, 10),
        tags: tagArray,
        videoUrl,
        userId: user.uid,
        isPublic: true,
        createdAt: serverTimestamp(),
      });

      setMessage('アップロード完了！');
      setTitle('');
      setDescription('');
      setType('sample');
      setCategory('その他');
      setPrice('1000');
      setTags('');
      setFile(null);
      setProgress(0);
    } catch (err) {
      console.error(err);
      setMessage('アップロードに失敗しました');
    } finally {
      setUploading(false);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('video/')) {
      setFile(droppedFile);
    } else {
      alert('動画ファイルのみアップロードできます');
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

      <input
        type="number"
        placeholder="価格（円）"
        className="border p-2 w-full"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <div className="flex gap-4">
        <select className="border p-2 w-full" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="sample">① サンプル</option>
          <option value="main">② 本編</option>
          <option value="dmode">③ ディレクターズカット</option>
        </select>

        <select className="border p-2 w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <input
        type="text"
        placeholder="タグ（カンマ区切りで入力）"
        className="border p-2 w-full"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <div
        className="border p-4 w-full border-dashed border-gray-400"
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="text-center text-gray-600">ここに動画をドラッグ＆ドロップしてください</p>
      </div>

      {file && <p>選択した動画: {file.name}</p>}

      {uploading && (
        <div className="w-full bg-gray-200 h-4 rounded">
          <div className="bg-pink-500 h-4 rounded" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
      >
        アップロード
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
};

export default Uploader;





























