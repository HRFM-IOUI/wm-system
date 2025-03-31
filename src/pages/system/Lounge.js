// src/pages/Lounge.js
import React from 'react';
import { Link } from 'react-router-dom';

const Lounge = () => {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-start">
      {/* ヘッダー */}
      <header className="w-full fixed top-0 z-50 bg-white shadow-md flex items-center justify-between px-4 py-2">
        <div className="text-2xl font-bold">ToaFansShop</div>
        <div className="flex gap-4">
          <Link to="/login" className="text-sm font-semibold hover:underline">ログイン</Link>
          <Link to="/signup" className="text-sm font-semibold bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600">新規登録</Link>
        </div>
      </header>

      <main className="w-full">
        {/* Hero動画背景セクション */}
        <section className="relative w-full h-[90vh] overflow-hidden mt-14 flex items-center justify-center">
          <video
            className="absolute w-full h-full object-cover"
            src="https://cdn.coverr.co/videos/coverr-lonely-palm-tree-9426/1080p.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="relative z-10 text-center text-white px-4">
            <h6 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">TOA-FANS.SHOPは、クリエイターTOAが提供するエンタメプロジェクトを、メンバーと一緒に楽しめる会員制オンラインサロンです。</h6>
            <p className="text-lg md:text-xl mb-6 drop-shadow-md">※クライアントが絡む公開前のプロジェクトをたくさん抱えておりますので、サロンの内容は秘密厳守とさせていただきます。 上記ルールをお守り頂けない場合は法的処置をとらせていただくことがございます。ご容赦ください。</p>
            <Link
              to="/signup"
              className="bg-pink-500 hover:bg-pink-600 text-white text-lg font-semibold px-6 py-3 rounded-full"
            >
              はじめてみる
            </Link>
          </div>
          <div className="absolute inset-0 bg-black opacity-40 z-0" />
        </section>

        {/* 他のセクション（サービス紹介、CTA、フッター）は後ほどでもOK） */}
      </main>
    </div>
  );
};

export default Lounge;