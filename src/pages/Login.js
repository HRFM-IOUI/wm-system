import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // デモ用ログイン認証（テスト用）
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === '0000@demo.com' && password === '0000') {
      navigate('/toppage');
    } else {
      alert('ログイン情報が正しくありません。');
    }
  };

  // Googleログイン（セッション待機あり）
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('ログイン成功:', result.user);

      if (auth.currentUser) {
        navigate('/toppage');
      } else {
        setTimeout(() => {
          if (auth.currentUser) {
            navigate('/toppage');
          } else {
            alert('ログインセッションが確立されていません。再度お試しください。');
          }
        }, 1000);
      }

    } catch (error) {
      console.error('Googleログインエラー:', error);
      alert('Googleログインに失敗しました');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">ログイン</h1>
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded"
        >
          ログイン
        </button>
      </form>

      <div className="my-6">または</div>

      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-2 bg-white border hover:bg-gray-100 px-4 py-2 rounded shadow"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
        <span className="text-sm font-semibold">Googleでログイン</span>
      </button>
    </div>
  );
};

export default Login;