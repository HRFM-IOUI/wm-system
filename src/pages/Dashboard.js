import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
  const [tab, setTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [products, setProducts] = useState([]);
  const [type, setType] = useState('text');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [productFile, setProductFile] = useState(null);
  const [productPreviewUrl, setProductPreviewUrl] = useState('');
  const [earnings, setEarnings] = useState(150000);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const savedWithdrawals = JSON.parse(localStorage.getItem('withdrawals') || '[]');
    setPosts(savedPosts);
    setProducts(savedProducts);
    setWithdrawals(savedWithdrawals);
  }, []);

  const dummySales = () => ({
    count: Math.floor(Math.random() * 50),
    price: 500,
  });

  const handleFileChange = (e, setter, previewSetter) => {
    const selected = e.target.files[0];
    setter(selected);
    if (selected) {
      const reader = new FileReader();
      reader.onloadend = () => previewSetter(reader.result);
      reader.readAsDataURL(selected);
    } else {
      previewSetter('');
    }
  };

  const getPostChartData = () => ({
    labels: posts.map((p) => p.title),
    datasets: [
      {
        label: '投稿売上（円）',
        data: posts.map((p) => (p.sales?.count || 0) * (p.sales?.price || 0)),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  });

  const getProductChartData = () => ({
    labels: products.map((p) => p.name),
    datasets: [
      {
        label: '商品価格（円）',
        data: products.map((p) => p.price || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  });   return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-white text-gray-800">
      <aside className="w-full sm:w-[240px] border-b sm:border-r border-gray-200 p-5">
        <h2 className="text-2xl font-bold text-pink-500 mb-6">オーナー管理</h2>
        <nav className="space-y-4">
          {[
            ['posts', '投稿管理'],
            ['products', '商品管理'],
            ['withdraw', '出金申請'],
            ['history', '出金履歴'],
            ['analytics', 'アナリティクス'],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`block w-full text-left hover:text-pink-500 ${
                tab === key ? 'font-bold text-pink-500' : ''
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 space-y-10 overflow-y-auto">
        {tab === 'posts' && (
          <>
            <h3 className="text-xl font-bold mb-4">新規投稿</h3>
            <div className="space-y-4 border p-4 rounded-lg shadow-sm max-w-xl bg-gray-50">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="text">テキスト</option>
                <option value="image">画像</option>
                <option value="video">動画</option>
              </select>
              <input
                type="text"
                placeholder="タイトル"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <textarea
                placeholder="説明"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded w-full h-24"
              />
              {(type === 'image' || type === 'video') && (
                <>
                  <input
                    type="file"
                    accept={type === 'image' ? 'image/*' : 'video/*'}
                    onChange={(e) => handleFileChange(e, setFile, setPreviewUrl)}
                  />
                  {previewUrl && (
                    <div className="mt-2">
                      {type === 'image' ? (
                        <img src={previewUrl} alt="preview" className="rounded w-full" />
                      ) : (
                        <video src={previewUrl} controls className="w-full rounded" />
                      )}
                    </div>
                  )}
                </>
              )}
              <button
                onClick={() => {
                  if (!title || !description) return alert('タイトルと説明は必須です');
                  const newPost = {
                    id: Date.now(),
                    type,
                    title,
                    description,
                    mediaUrl: previewUrl || '',
                    isPublic: false,
                    stats: { likes: 0, views: 0 },
                    sales: dummySales(),
                    user: { name: 'オーナー', avatar: 'https://i.pravatar.cc/150?img=59' },
                  };
                  const updated = [newPost, ...posts];
                  setPosts(updated);
                  localStorage.setItem('posts', JSON.stringify(updated));
                  setTitle('');
                  setDescription('');
                  setFile(null);
                  setPreviewUrl('');
                  setType('text');
                }}
                className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
              >
                投稿する
              </button>
            </div>

            <h3 className="text-xl font-bold mt-10 mb-4">投稿一覧</h3>
            <div className="space-y-6">
              {posts.map((post, index) => (
                <PostItem
                  key={post.id}
                  post={post}
                  onUpdate={(updatedPost) => {
                    const updated = [...posts];
                    updated[index] = updatedPost;
                    setPosts(updated);
                    localStorage.setItem('posts', JSON.stringify(updated));
                  }}
                  onDelete={() => {
                    if (window.confirm('この投稿を削除しますか？')) {
                      const filtered = posts.filter((_, i) => i !== index);
                      setPosts(filtered);
                      localStorage.setItem('posts', JSON.stringify(filtered));
                    }
                  }}
                />
              ))}
            </div>
          </>
        )}         {tab === 'products' && (
          <>
            <h3 className="text-xl font-bold mb-4">新規商品</h3>
            <div className="space-y-4 border p-4 rounded-lg shadow-sm max-w-xl bg-gray-50">
              <input
                type="text"
                placeholder="商品名"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <textarea
                placeholder="商品説明"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="border p-2 rounded w-full h-24"
              />
              <input
                type="number"
                placeholder="価格（円）"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => handleFileChange(e, setProductFile, setProductPreviewUrl)}
              />
              {productPreviewUrl && (
                <div className="mt-2">
                  {productFile?.type?.startsWith('image') ? (
                    <img src={productPreviewUrl} alt="preview" className="rounded w-full" />
                  ) : (
                    <video src={productPreviewUrl} controls className="rounded w-full" />
                  )}
                </div>
              )}
              <button
                onClick={() => {
                  if (!productTitle || !price || !productDescription)
                    return alert('全項目を入力してください');
                  const newProduct = {
                    id: Date.now(),
                    name: productTitle,
                    description: productDescription,
                    price: parseInt(price),
                    mediaUrl: productPreviewUrl || '',
                  };
                  const updated = [newProduct, ...products];
                  setProducts(updated);
                  localStorage.setItem('products', JSON.stringify(updated));
                  setProductTitle('');
                  setProductDescription('');
                  setPrice('');
                  setProductFile(null);
                  setProductPreviewUrl('');
                }}
                className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
              >
                商品を登録する
              </button>
            </div>

            <h3 className="text-xl font-bold mt-10 mb-4">商品一覧</h3>
            <div className="space-y-6">
              {products.map((product, index) => (
                <div key={product.id} className="border p-4 rounded shadow-sm bg-white space-y-2">
                  <div className="flex justify-between">
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => {
                        const updated = [...products];
                        updated[index].name = e.target.value;
                        setProducts(updated);
                        localStorage.setItem('products', JSON.stringify(updated));
                      }}
                      className="font-semibold w-full border-b"
                    />
                    <button
                      onClick={() => {
                        if (window.confirm('この商品を削除しますか？')) {
                          const filtered = products.filter((_, i) => i !== index);
                          setProducts(filtered);
                          localStorage.setItem('products', JSON.stringify(filtered));
                        }
                      }}
                      className="text-red-500 text-sm hover:underline ml-2"
                    >
                      削除
                    </button>
                  </div>
                  <textarea
                    value={product.description}
                    onChange={(e) => {
                      const updated = [...products];
                      updated[index].description = e.target.value;
                      setProducts(updated);
                      localStorage.setItem('products', JSON.stringify(updated));
                    }}
                    className="text-gray-600 w-full border p-1 rounded text-sm"
                  />
                  <p className="text-sm text-gray-500">価格: {product.price.toLocaleString()}円</p>
                  {product.mediaUrl && (
                    <div className="mt-2">
                      {product.mediaUrl.includes('video') ? (
                        <video src={product.mediaUrl} controls className="rounded w-full" />
                      ) : (
                        <img src={product.mediaUrl} alt="preview" className="rounded w-full" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'withdraw' && (
          <div>
            <h3 className="text-xl font-bold mb-4">出金申請</h3>
            <p className="mb-2">出金可能残高：<strong>{earnings.toLocaleString()}円</strong></p>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="金額を入力"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <button
                onClick={() => {
                  const amount = parseInt(withdrawAmount);
                  if (isNaN(amount) || amount <= 0 || amount > earnings) {
                    alert('正しい金額を入力してください');
                    return;
                  }
                  const newRecord = {
                    id: Date.now(),
                    date: new Date().toLocaleDateString(),
                    amount,
                    status: '申請中',
                  };
                  const updated = [newRecord, ...withdrawals];
                  setWithdrawals(updated);
                  localStorage.setItem('withdrawals', JSON.stringify(updated));
                  setEarnings((prev) => prev - amount);
                  setWithdrawAmount('');
                }}
                className="bg-pink-500 text-white px-4 rounded hover:bg-pink-600"
              >
                申請
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-2">※最低出金額：1,000円（手数料無料）</p>
          </div>
        )}

        {tab === 'history' && (
          <div>
            <h3 className="text-xl font-bold mb-4">出金履歴</h3>
            {withdrawals.length === 0 ? (
              <p className="text-gray-400">出金履歴がまだありません。</p>
            ) : (
              <div className="space-y-3">
                {withdrawals.map((w) => (
                  <div key={w.id} className="p-3 border rounded bg-gray-50">
                    <p>日付：{w.date}</p>
                    <p>金額：{w.amount.toLocaleString()}円</p>
                    <p className="text-sm text-gray-500">ステータス：{w.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'analytics' && (
          <div className="max-w-5xl mx-auto space-y-10">
            <h3 className="text-2xl font-bold text-center text-pink-500">アナリティクス</h3>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">投稿ごとの売上</h4>
              {posts.length === 0 ? (
                <p className="text-gray-400 text-sm">投稿データがありません。</p>
              ) : (
                <div className="overflow-x-auto">
                  <Bar data={getPostChartData()} />
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">商品価格一覧</h4>
              {products.length === 0 ? (
                <p className="text-gray-400 text-sm">商品データがありません。</p>
              ) : (
                <div className="overflow-x-auto">
                  <Bar data={getProductChartData()} />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// 投稿1件の補助コンポーネント
const PostItem = ({ post, onUpdate, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedDescription, setEditedDescription] = useState(post.description);

  const handleSave = () => {
    onUpdate({ ...post, title: editedTitle, description: editedDescription });
    setEditMode(false);
  };

  return (
    <div className="border p-4 rounded shadow-sm bg-white space-y-2">
      {editMode ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full border p-2 rounded h-20"
          />
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600">
              保存
            </button>
            <button onClick={() => setEditMode(false)} className="text-gray-500 hover:underline">
              キャンセル
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">{post.title}</h4>
            <div className="flex gap-2">
              <button onClick={() => setEditMode(true)} className="text-blue-500 hover:underline text-sm">
                編集
              </button>
              <button onClick={onDelete} className="text-red-500 hover:underline text-sm">
                削除
              </button>
            </div>
          </div>
          <p className="text-gray-600 text-sm">{post.description}</p>
          {post.type === 'image' && <img src={post.mediaUrl} alt="" className="rounded w-full mt-2" />}
          {post.type === 'video' && <video src={post.mediaUrl} controls className="rounded w-full mt-2" />}
          <div className="text-sm text-gray-500 mt-2">
            販売数: {post.sales.count} 件 / 売上: {(post.sales.count * post.sales.price).toLocaleString()} 円
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;