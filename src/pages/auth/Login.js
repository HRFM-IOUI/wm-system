// ✅ Login.js（完全版）
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import CommonButton from "../../components/ui/CommonButton";
import FormLabel from "../../components/ui/FormLabel";
import FormInput from "../../components/ui/FormInput";
import SectionBox from "../../components/ui/SectionBox";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!executeRecaptcha) {
        alert("reCAPTCHAが準備できていません。");
        return;
      }
      const token = await executeRecaptcha("login");
      console.log("reCAPTCHA Token:", token);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/toppage");
    } catch (error) {
      alert("ログインに失敗しました: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("ログイン成功:", result.user);
      navigate("/toppage");
    } catch (error) {
      alert("Googleログインに失敗しました");
    }
  };

  return (
    <div className="min-h-screen bg-theme-gray flex items-center justify-center px-4">
      <SectionBox className="w-full max-w-md rounded-2xl space-y-6">
        <h1 className="text-center text-3xl font-extrabold text-gray-800">ログイン</h1>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <FormLabel htmlFor="email">メールアドレス</FormLabel>
            <FormInput
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="例：user@example.com"
              required
            />
          </div>

          <div>
            <FormLabel htmlFor="password">パスワード</FormLabel>
            <FormInput
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6文字以上"
              required
            />
          </div>

          <CommonButton type="submit" className="w-full rounded-full text-lg">
            ログイン
          </CommonButton>
        </form>

        <p className="text-center text-sm text-gray-500">または</p>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white border rounded-full py-2.5 px-4 hover:bg-gray-100 shadow transition text-sm text-black font-semibold"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Googleでログイン
        </button>

        <p className="text-sm text-center text-gray-600">
          アカウントをお持ちでない方は {" "}
          <a href="/signup" className="text-theme-pink hover:underline font-semibold">新規登録</a>
        </p>
        <p className="text-xs text-center text-gray-400">
          <a href="/lounge" className="hover:underline">← Loungeに戻る</a>
        </p>
      </SectionBox>
    </div>
  );
};

export default Login;



