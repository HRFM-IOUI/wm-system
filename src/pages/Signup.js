import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // 仮登録処理（将来的にバックエンドと連携）
    console.log('新規登録:', email, password);
    navigate('/toppage'); // 仮にトップページへ遷移
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md p-8 space-y-6 shadow-md rounded-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">新規登録</h2>
        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 transition"
          >
            登録する
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          すでにアカウントをお持ちですか？{' '}
          <a href="/login" className="text-pink-500 hover:underline">
            ログイン
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
