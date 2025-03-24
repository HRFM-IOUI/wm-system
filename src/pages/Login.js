import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("現在の入力ID:", id, "PASS:", pass);
    if (id.trim() === '0000@demo.com' && pass === '0000') {
      console.log("ログイン成功 → /toppage に遷移");
      navigate('/toppage');
    } else {
      alert('ログイン失敗：IDまたはパスワードが違います');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-orange-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center">TOA ログイン</h2>
        <input
          type="text"
          placeholder="メールアドレス（例: 0000@demo.com）"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="password"
          placeholder="パスワード（0000）"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
        >
          ログイン
        </button>
      </form>
    </div>
  );
};

export default Login;