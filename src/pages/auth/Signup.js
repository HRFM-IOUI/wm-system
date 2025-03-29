import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/toppage');
    } catch (error) {
      alert('登録に失敗しました: ' + error.message);
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md p-8 space-y-6 shadow-md rounded-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">新規登録</h2>
        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="password"
            placeholder="パスワード（6文字以上）"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600"
          >
            登録する
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          すでにアカウントをお持ちですか？{' '}
          <a href="/login" className="text-pink-500 hover:underline">ログイン</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

