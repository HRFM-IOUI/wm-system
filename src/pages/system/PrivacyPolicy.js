// src/pages/system/PrivacyPolicy.js
import React from 'react';
import BackButton from '../../components/common/BackButton';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-6 text-gray-800 flex flex-col items-center">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold text-center">プライバシーポリシー</h1>

        <p>
          TOA Lounge（以下「当サービス」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めています。
        </p>
        <p>
          ご提供いただいた個人情報は、サービスの提供、本人確認、カスタマーサポート、利用状況の分析、不正利用の防止などに活用されます。
        </p>
        <p>
          情報の提供は原則としてユーザーの任意であり、同意なく第三者に提供することはありません（法令による場合を除く）。
        </p>
        <p>
          個人情報の開示・訂正・削除をご希望される場合は、当サービスのお問い合わせフォームよりご連絡ください。
        </p>
        <p className="text-xs text-gray-500">
          本ポリシーは法令改正や運営方針の変更により、随時改訂されることがあります。
        </p>

        <BackButton label="Loungeに戻る" to="/lounge" />
      </div>
    </div>
  );
};

export default PrivacyPolicy;

