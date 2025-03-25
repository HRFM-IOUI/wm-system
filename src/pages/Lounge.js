import React from 'react';
import { Link } from 'react-router-dom';

const Lounge = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-orange-200 to-white text-gray-800 flex flex-col sm:flex-row">
      {/* 左サイド（PCのみ） */}
      <div className="hidden sm:flex sm:flex-col sm:justify-between w-[20%] min-w-[200px] p-6 border-r border-white/30">
        <div className="text-2xl font-bold text-pink-600">TOA</div>
        <nav className="space-y-4 text-gray-600 font-medium mt-10">
          <div className="hover:text-pink-500 cursor-pointer">ホーム</div>
          <div className="hover:text-pink-500 cursor-pointer">クリエイター一覧</div>
          <div className="hover:text-pink-500 cursor-pointer">よくある質問</div>
        </nav>
        <div className="text-xs text-gray-400">© 2025 TOA Inc.</div>
      </div>

      {/* 中央メイン */}
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center relative">
        <div className="max-w-xl w-full space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-pink-700 leading-tight drop-shadow">
            あなたの世界をファンとつなぐ
          </h1>
          <p className="text-gray-700 text-base sm:text-lg">
          TOA-FANS.SHOPは、クリエイターTOAが提供するエンタメの未来や、現在手がけているプロジェクトを、メンバーと一緒に作り、共有する、会員制オンラインサロンです。

プロクリエイターのTOAが、エンタメを作っていく過程や、直面して得たリアルなどを、「一番近くの席で見られるリアルタイム型のメイキング」みたいなものです。プロクリエーターのとあが、サロン会員限定のコンテンツを毎日投稿しており、アートとして、立体的な読み物としてお楽しみいただけます。<br className="hidden sm:block" />
            安心・洗練された空間で、あなただけの価値を届けよう。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-90 text-white rounded-full font-semibold text-lg shadow-md transition"
            >
              ログイン
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 border border-pink-400 text-pink-600 rounded-full font-semibold text-lg shadow-sm hover:bg-pink-50 transition"
            >
              無料ではじめる
            </Link>
          </div>
        </div>
      </div>

      {/* 右サイド（PCのみ） */}
      <div className="hidden sm:flex w-[20%] min-w-[200px] p-6 border-l border-white/30 flex-col justify-between">
        <div className="space-y-3 text-sm text-pink-800 font-medium">
          <div>・サロン仮メンバーの費用0円</div>
          <div>・サロンメンバーならではの！！！</div>
          <div>・ファン交流プログラム</div>
        </div>
        <div className="text-xs text-gray-400 text-right">ver. 1.0.0</div>
      </div>
    </div>
  );
};

export default Lounge;