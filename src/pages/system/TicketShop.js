// src/pages/system/TicketShop.js

import React from 'react';

const TicketShop = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="max-w-xl mx-auto p-4 space-y-6">
        <h1 className="text-xl font-bold text-center mb-6">🎫 チケット購入</h1>

        {/* PayPay支払い */}
        <section className="bg-gray-50 p-4 rounded shadow space-y-2">
          <h2 className="font-semibold text-lg">PayPayで支払う</h2>
          <div className="text-center text-sm text-gray-500 italic mb-2">
            （QRコードは現在準備中です）
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            ご自身のPayPayアプリから送金してください。送金後、
            <span className="font-semibold">マイページの「お問い合わせ」</span>よりご連絡ください。
          </p>
        </section>

        {/* 銀行振込 */}
        <section className="bg-gray-50 p-4 rounded shadow space-y-2">
          <h2 className="font-semibold text-lg">銀行振込</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            銀行名：〇〇銀行<br />
            支店名：〇〇支店<br />
            口座番号：普通 1234567<br />
            口座名義：ワエム システム（仮）
          </p>
          <p className="text-sm text-gray-600">
            振込後、お問い合わせフォームよりご一報ください。確認次第、ポイントを反映いたします。
          </p>
        </section>

        {/* クレカ・コンビニ決済 */}
        <section className="bg-gray-50 p-4 rounded shadow space-y-4">
          <h2 className="font-semibold text-lg">その他の決済方法</h2>
          <p className="text-sm text-gray-600">
            クレジットカード／コンビニ払いにも順次対応予定です。
          </p>
          <button
            onClick={() => alert('決済リンクは現在準備中です')}
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded shadow text-sm font-semibold"
          >
            決済ページへ
          </button>
        </section>
      </div>
    </div>
  );
};

export default TicketShop;



