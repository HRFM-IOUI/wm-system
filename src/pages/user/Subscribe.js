import React from 'react';
import { useNavigate } from 'react-router-dom';

const Subscribe = () => {
  const navigate = useNavigate();

  const handleSubscribe = () => {
    alert('サブスク申し込みフローは現在準備中です。');
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-gray-50 p-6 rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          サブスクメニューのご紹介
        </h2>
        <p className="text-sm text-gray-600">
          本オンラインサロンでは、TOAクリエイターによる限定コンテンツ、イベント参加、チャット交流などをお楽しみいただけます。
        </p>
        <div className="text-center">
          <span className="text-3xl font-bold text-pink-600">¥1,200</span>
          <span className="text-gray-700"> / 月 (税込・自動継続)</span>
        </div>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>ファン限定コンテンツのフルアクセス</li>
          <li>ライブ配信・イベントへの優先参加枠</li>
          <li>イベントではファンと直接交流！</li>
          <li>いつでもキャンセル可能</li>
        </ul>
        <button
          onClick={handleSubscribe}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md shadow"
        >
          メンバーになる（登録後に加入できます）
        </button>
        <p className="text-xs text-gray-500 text-center">
          解約はマイページからいつでも可能です。
        </p>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 mb-2">下記のリンクからお戻りください。</p>
        <button
          onClick={() => navigate('/lounge')}
          className="text-blue-600 hover:underline text-sm"
        >
          Loungeに戻る
        </button>
      </div>
    </div>
  );
};

export default Subscribe;



