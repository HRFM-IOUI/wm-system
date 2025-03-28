// src/components/GachaPreloadAssets.js

import React from 'react';
import { Helmet } from 'react-helmet';

const GachaPreloadAssets = () => {
  return (
    <Helmet>
      {/* 例：ガチャ演出用の画像を先読み（必要に応じて追加可能） */}
      <link rel="preload" as="image" href="/images/charge01.png" />
      <link rel="preload" as="image" href="/images/charge02.png" />
      <link rel="preload" as="image" href="/images/charge03.png" />
      <link rel="preload" as="image" href="/images/charge04.png" />
      <link rel="preload" as="image" href="/images/charge05.png" />
      <link rel="preload" as="image" href="/images/charge06.png" />
      <link rel="preload" as="image" href="/images/charge07.png" />
      <link rel="preload" as="image" href="/images/charge08.png" />

      {/* 必要であればLottie JSONファイルも追加可 */}
      {/* <link rel="preload" as="fetch" href="/assets/gacha-animation.json" type="application/json" crossorigin="anonymous" /> */}
    </Helmet>
  );
};

export default GachaPreloadAssets;