import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import SectionBox from "../../components/ui/SectionBox";

const SignupEmail = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setSending(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      setMessage("確認メールを送信しました。メールを確認してください。");

      // ✅ サブスク導線ページへ誘導（ログイン後加入導線あり）
      setTimeout(() => {
        navigate("/subscribe");
      }, 4000);
    } catch (error) {
      console.error("登録エラー:", error.message);
      setMessage("登録に失敗しました: " + error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-gray flex items-center justify-center px-4">
      <SectionBox className="w-full max-w-md rounded-2xl space-y-6">
        <h1 className="text-center text-2xl font-bold text-gray-800">メールアドレスで登録</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="パスワード（6文字以上）"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded font-semibold"
          >
            {sending ? "送信中..." : "登録して確認メール送信"}
          </button>
        </form>

        {message && <p className="text-sm text-center text-gray-700">{message}</p>}

        <p className="text-xs text-center text-gray-400">
          <a href="/signup" className="hover:underline">← Google登録に戻る</a>
        </p>
      </SectionBox>
    </div>
  );
};

export default SignupEmail;

