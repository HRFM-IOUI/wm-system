// src/pages/system/TicketShop.js（修正済）

import React from 'react';

const TicketShop = () => {
  return (
    <div className="max-w-xl mx-auto p-4 space-y-6 text-gray-800">
      <h1 className="text-xl font-bold text-center">🎫 チケット購入</h1>

      {/* PayPay支払い */}
      <section className="border p-4 rounded shadow bg-white">
        <h2 className="font-semibold text-lg mb-2">PayPayで支払う</h2>
        <div className="text-center text-gray-500 italic text-sm mb-2">
          （QRコードは現在準備中です）
        </div>
        <p className="text-sm text-gray-600">
          ご自身のPayPayアプリから送金してください。送金後、
          <span className="font-semibold">マイページの「お問い合わせ」</span>よりご連絡ください。
        </p>
      </section>

      {/* 銀行振込 */}
      <section className="border p-4 rounded shadow bg-white">
        <h2 className="font-semibold text-lg mb-2">銀行振込</h2>
        <p className="text-sm leading-relaxed">
          銀行名：〇〇銀行<br />
          支店名：〇〇支店<br />
          口座番号：普通 1234567<br />
          口座名義：ワエム システム（仮）
        </p>
        <p className="text-sm text-gray-600 mt-2">
          振込後、お問い合わせフォームよりご一報ください。確認次第、ポイントを反映いたします。
        </p>
      </section>

      {/* クレジットカード・コンビニ決済 */}
      <section className="border p-4 rounded shadow bg-white">
        <h2 className="font-semibold text-lg mb-2">その他の決済方法</h2>
        <p className="text-sm text-gray-600 mb-2">
          クレジットカード／コンビニ払いにも順次対応予定です。
        </p>
        <button
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => alert('決済リンクは現在準備中です')}
        >
          決済ページへ
        </button>
      </section>
    </div>
  );
};

export default TicketShop;


