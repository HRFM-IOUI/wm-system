// src/pages/system/TermsOfService.js
import React from 'react';
import BackButton from '../../components/common/BackButton';

const TermsOfService = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-6 text-gray-800 flex flex-col items-center">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold text-center">利用規約</h1>

        <p>
          本規約は、TOA Lounge（以下「当サービス」）が提供するコンテンツ・サービスの利用条件を定めるものです。
          ユーザーは、本規約に同意のうえ当サービスを利用するものとします。
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>当サービス内のコンテンツの無断転載・再配布を禁じます。</li>
          <li>他のユーザーや運営への迷惑行為・不正利用は禁止します。</li>
          <li>サービスの内容は予告なく変更・中止される場合があります。</li>
          <li>当サービスの利用により生じた損害に対して、運営は責任を負いません。</li>
        </ul>
        <p className="text-xs text-gray-500">
          本規約は必要に応じて随時変更され、変更後の内容は本ページに掲載された時点で効力を持つものとします。
        </p>

        <BackButton label="Loungeに戻る" to="/lounge" />
      </div>
    </div>
  );
};

export default TermsOfService;

