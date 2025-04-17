// src/pages/system/BuyPoints.js
import React from 'react';

const BuyPoints = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="max-w-xl mx-auto p-6 space-y-6">
        <h1 className="text-xl font-bold text-center">ポイント購入</h1>

        {/* PayPay 決済 */}
        <section className="bg-gray-50 p-4 rounded shadow">
          <h2 className="font-semibold text-lg mb-2">PayPayで支払う</h2>
          <div className="text-center text-gray-500 italic text-sm mb-2">
            （QRコードは現在準備中です）
          </div>
          <p className="text-sm text-gray-600">
            ご自身のPayPayアプリから送金してください。送金後、{' '}
            <span className="font-semibold">マイページの「お問い合わせ」</span>よりご連絡ください。
          </p>
        </section>

        {/* 銀行振込 */}
        <section className="bg-gray-50 p-4 rounded shadow">
          <h2 className="font-semibold text-lg mb-2">銀行振込</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            銀行名：○○銀行 ○○支店<br />
            口座番号：普通 1234567<br />
            口座名義：ワエム システム（仮）
          </p>
          <p className="text-sm text-gray-600 mt-2">
            振込後にお問い合わせをお願いします。確認後、ポイントを加算いたします。
          </p>
        </section>

        {/* その他決済 */}
        <section className="bg-gray-50 p-4 rounded shadow">
          <h2 className="font-semibold text-lg mb-2">その他の決済方法</h2>
          <p className="text-sm text-gray-600 mb-2">
            クレジットカードやコンビニ支払いにも対応予定です。
          </p>
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded shadow text-sm"
            onClick={() => alert('決済リンクは現在準備中です')}
          >
            決済ページへ
          </button>
        </section>
      </div>
    </div>
  );
};

export default BuyPoints;

