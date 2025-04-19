import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import CommonButton from "../../components/ui/CommonButton";
import FormInput from "../../components/ui/FormInput";

const EmailSignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (nickname.trim().length === 0) {
      alert("ニックネームを入力してください。");
      return;
    }

    try {
      if (!executeRecaptcha) {
        alert("reCAPTCHAが準備できていません。");
        return;
      }

      const token = await executeRecaptcha("signup_email");
      console.log("reCAPTCHA Token:", token);

      await createUserWithEmailAndPassword(auth, email, password);
      // TODO: nickname や inviteCode を Firestore に保存する処理を追加
      navigate("/toppage");
    } catch (error) {
      alert("登録に失敗しました: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 text-center text-gray-800">
      <h2 className="text-sm mb-4">
        新規会員登録をいただく際、「
        <a href='/system/TermsOfService' target="_blank" className="underline text-blue-600">利用規約</a>
        」を必ずお読みください。登録することにより
        <a href='/system/PrivacyPolicy' target="_blank" className="underline text-blue-600">個人情報保護方針</a>
        に同意したことになります。
      </h2>

      <h3 className="mb-2 font-semibold text-lg">メールアドレスで登録</h3>
      <form onSubmit={handleSignup} className="space-y-3 w-full max-w-md mx-auto text-left">
        <FormInput
          type="email"
          placeholder="例：user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <FormInput
          type="password"
          placeholder="8文字以上の英数字を推奨"
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="text-xs text-gray-500 pl-1">※6文字以上。英数字混在を推奨します。</p>

        <FormInput
          type="text"
          placeholder="ニックネーム（20文字以内）"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={20}
          required
        />
        <p className="text-xs text-gray-500 pl-1">※表示名として利用されます。</p>

        <FormInput
          type="text"
          placeholder="招待コード（任意）"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />
        <p className="text-xs text-gray-400 pl-1">お持ちでない方は空欄でOKです。</p>

        <CommonButton type="submit" className="bg-pink-500 hover:bg-pink-600 text-white w-full py-2 rounded-full">
          会員登録する
        </CommonButton>
      </form>

      <p className="text-xs text-center text-gray-400 mt-6">
        <a href="/lounge" className="hover:underline">← Loungeに戻る</a>
      </p>
    </div>
  );
};

export default EmailSignupPage;


