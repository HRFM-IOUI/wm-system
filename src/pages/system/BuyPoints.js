// src/pages/system/BuyPoints.js
import React from 'react';

const BuyPoints = () => {
  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 text-gray-800">
      <h1 className="text-xl font-bold text-center">ポイント購入</h1>

      {/* PayPay 決済 */}
      <section className="border p-4 rounded shadow bg-white">
        <h2 className="font-semibold text-lg mb-2">PayPayで支払う</h2>
        <div className="flex justify-center">
          {/* QRコード画像は後ほど assets に追加想定 */}
          <div className="w-48 h-48 bg-gray-200 flex items-center justify-center text-gray-500">
            QRコード
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          QRコードを読み取り、任意の金額をご送金ください。<br />
          送金後、<span className="font-bold">お問い合わせ</span>よりご連絡ください。
        </p>
      </section>

      {/* 銀行振込 */}
      <section className="border p-4 rounded shadow bg-white">
        <h2 className="font-semibold text-lg mb-2">銀行振込</h2>
        <p className="text-sm">
          銀行名：○○銀行 ○○支店<br />
          口座番号：普通 1234567<br />
          口座名義：ワエム システム（仮）
        </p>
        <p className="text-sm text-gray-600 mt-2">
          振込後にお問い合わせをお願いします。確認後、ポイントを加算いたします。
        </p>
      </section>

      {/* その他決済 */}
      <section className="border p-4 rounded shadow bg-white">
        <h2 className="font-semibold text-lg mb-2">その他の決済方法</h2>
        <p className="text-sm text-gray-600 mb-2">
          クレジットカードやコンビニ支払いにも対応予定です。
        </p>
        <button className="bg-gray-400 text-white px-4 py-2 rounded opacity-60 cursor-not-allowed" disabled>
          Coming Soon
        </button>
      </section>
    </div>
  );
};

export default BuyPoints;
