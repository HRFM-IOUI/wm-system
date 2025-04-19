import React from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../firebase";
import SectionBox from "../../components/ui/SectionBox";

const Signup = () => {
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google登録成功:", result.user);
      navigate("/toppage");
    } catch (error) {
      alert("Google登録に失敗しました: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-theme-gray flex items-center justify-center px-4">
      <SectionBox className="w-full max-w-md rounded-2xl space-y-6">
        <h1 className="text-center text-3xl font-extrabold text-gray-800">新規登録</h1>

        {/* ✅ Googleログイン */}
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 bg-white border rounded-full py-2.5 px-4 hover:bg-gray-100 shadow transition text-sm text-black font-semibold"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Googleで登録
        </button>

        {/* ✅ LINEログイン（ダミーボタン） */}
        <button
          className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-full py-2.5 px-4 text-sm font-semibold"
          onClick={() => alert("LINEログインは現在準備中です")}
        >
          <img src="/icons/line-icon.svg" alt="LINE" className="w-5 h-5" />
          LINEで登録
        </button>

        {/* ✅ Xログイン（ダミーボタン） */}
        <button
          className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white rounded-full py-2.5 px-4 text-sm font-semibold"
          onClick={() => alert("Xログインは現在準備中です")}
        >
          <img src="/icons/x-icon.svg" alt="X(Twitter)" className="w-5 h-5" />
          Xで登録
        </button>

        {/* ✅ メール登録ページへの導線 */}
        <div className="text-sm text-center text-gray-600">
          または{" "}
          <a href="/signup/email" className="text-theme-pink hover:underline font-semibold">
            メールアドレスで登録
          </a>
        </div>

        <p className="text-xs text-center text-gray-400">
          <a href="/lounge" className="hover:underline">← Loungeに戻る</a>
        </p>
      </SectionBox>
    </div>
  );
};

export default Signup;














