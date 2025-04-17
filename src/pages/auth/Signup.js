// ✅ Signup.js（改良＋スクロール不要対策版）
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import CommonButton from "../../components/ui/CommonButton";
import FormLabel from "../../components/ui/FormLabel";
import FormInput from "../../components/ui/FormInput";
import SectionBox from "../../components/ui/SectionBox";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const policyRef = useRef(null);

  const handleScroll = () => {
    const el = policyRef.current;
    if (el && el.scrollHeight - el.scrollTop <= el.clientHeight + 1) {
      setScrolled(true);
    }
  };

  useEffect(() => {
    const el = policyRef.current;
    if (el && el.scrollHeight <= el.clientHeight + 1) {
      setScrolled(true); // スクロール不要な場合も有効化
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!agreed || !scrolled) {
      alert("規約を最後まで読み、同意にチェックを入れてください。");
      return;
    }

    try {
      if (!executeRecaptcha) {
        alert("reCAPTCHAが準備できていません。");
        return;
      }

      const token = await executeRecaptcha("signup");
      console.log("reCAPTCHA Token:", token);

      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/toppage");
    } catch (error) {
      alert("登録に失敗しました: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-theme-gray flex items-center justify-center px-4">
      <SectionBox className="w-full max-w-md rounded-2xl space-y-6">
        <h2 className="text-center text-3xl font-extrabold text-gray-800">新規登録</h2>

        <form onSubmit={handleSignup} className="space-y-4 text-left">
          <div>
            <FormLabel htmlFor="email">メールアドレス</FormLabel>
            <FormInput
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="例：user@example.com"
            />
          </div>

          <div>
            <FormLabel htmlFor="password">パスワード（6文字以上）</FormLabel>
            <FormInput
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>

          <div
            className="border p-2 rounded max-h-40 overflow-y-auto text-xs text-gray-600 bg-white"
            ref={policyRef}
            onScroll={handleScroll}
          >
            <p>
              本サービスをご利用いただくにあたり、
              <a href="/system/TermsOfService" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">利用規約</a>、
              <a href="/system/PrivacyPolicy" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">プライバシーポリシー</a>、
              <a href="/system/LegalNotice" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">特定商取引法に基づく表記</a>
              への同意が必要です。未成年者・非会員による不正アクセスや漏洩行為には厳正に対処します。
              内容の転載・二次利用は禁止されており、違反時には法的措置を講じる可能性があります。
              また、コンテンツの特性上、予告なく構成・仕様が変更されることがあります。
            </p>
          </div>

          <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              disabled={!scrolled}
              className="accent-pink-600"
            />
            <span>上記の規約を読み、同意しました。</span>
          </label>

          <CommonButton
            type="submit"
            className={`w-full rounded-full text-lg ${!agreed || !scrolled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!agreed || !scrolled}
          >
            登録する
          </CommonButton>
        </form>

        <p className="text-sm text-center text-gray-600">
          すでにアカウントをお持ちですか？{" "}
          <a href="/login" className="text-theme-pink hover:underline font-semibold">ログイン</a>
        </p>
        <p className="text-xs text-center text-gray-400">
          <a href="/lounge" className="hover:underline">← Loungeに戻る</a>
        </p>
      </SectionBox>
    </div>
  );
};

export default Signup;








