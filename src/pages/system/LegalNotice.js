// src/pages/system/LegalNotice.js
import React from 'react';
import BackButton from '../../components/common/BackButton';

const LegalNotice = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-6 text-gray-800 flex flex-col items-center">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold text-center">特定商取引法に基づく表記</h1>

        <ul className="space-y-2 text-sm">
          <li><strong>販売業者名：</strong>ワエム システム（仮）</li>
          <li><strong>運営責任者：</strong>山田 太郎（仮名）</li>
          <li><strong>所在地：</strong>東京都〇〇区〇〇1-2-3（仮）</li>
          <li><strong>お問い合わせ：</strong>support@toafans.shop</li>
          <li><strong>販売価格：</strong>各商品・コンテンツごとに表示</li>
          <li><strong>商品代金以外の必要料金：</strong>振込手数料・通信費等</li>
          <li><strong>お支払い方法：</strong>PayPay、銀行振込、他（詳細は購入ページ記載）</li>
          <li><strong>提供時期：</strong>決済確認後、即時または指定日時</li>
          <li><strong>返品・キャンセル：</strong>性質上、提供後の返品・キャンセルは不可</li>
        </ul>

        <p className="text-xs text-gray-500">
          本表記は、法令に基づき随時見直し・更新されます。
        </p>

        <BackButton label="Loungeに戻る" to="/lounge" />
      </div>
    </div>
  );
};

export default LegalNotice;

