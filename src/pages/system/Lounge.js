// src/pages/Lounge.js
import React from 'react';
import { Link } from 'react-router-dom';

const Lounge = () => {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* 固定ヘッダー */}
      <header className="w-full fixed top-0 z-50 bg-white shadow-md flex items-center justify-between px-4 py-2">
        <div className="text-xl font-bold">ToaFansShop</div>
        <div className="flex gap-4">
          <Link to="/login" className="text-sm font-semibold hover:underline">
            ログイン
          </Link>
          <Link
            to="/signup"
            className="text-sm font-semibold bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600"
          >
            新規登録
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full pt-16">
        {/* Heroセクション */}
        <section className="relative w-full h-[90vh] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="https://cdn.coverr.co/videos/coverr-lonely-palm-tree-9426/1080p.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black opacity-50 z-10" />
          <div className="relative z-20 flex flex-col justify-center items-center text-white text-center px-4 h-full">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              TOA-FANS.SHOPは、クリエイターTOAが提供する
              <br />
              エンタメプロジェクトを楽しむ会員制オンラインサロンです
            </h1>
            <p className="text-sm md:text-lg mb-6 drop-shadow-md max-w-2xl">
              ※公開前のプロジェクトが多いため、内容は秘密厳守。違反があった場合は法的措置を取る可能性があります。
            </p>
            <Link
              to="/signup"
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full text-lg"
            >
              はじめてみる
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Lounge;
