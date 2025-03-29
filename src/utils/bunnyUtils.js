// src/utils/bunnyUtils.js
import axios from "axios";

// .env から読み込み
const BUNNY_API_KEY = process.env.REACT_APP_BUNNY_API_KEY;
const LIBRARY_ID = process.env.REACT_APP_BUNNY_LIBRARY_ID;
const BUNNY_CDN_URL = process.env.REACT_APP_BUNNY_CDN_URL;

/**
 * Bunny Video に動画アップロードして再生URLを取得
 * @param {File} file - MP4動画ファイル
 * @param {string} title - 動画のタイトル
 * @returns {Object} { videoId, playbackUrl }
 */
export async function uploadVideoToBunny(file, title = "Untitled") {
  // ① 動画エントリ作成（title送信）
  const createRes = await axios.post(
    `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos`,
    { title },
    {
      headers: {
        AccessKey: BUNNY_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  const videoId = createRes.data.guid;

  // ② ファイルアップロード（PUT）
  await axios.put(
    `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos/${videoId}`,
    file,
    {
      headers: {
        AccessKey: BUNNY_API_KEY,
        "Content-Type": "application/octet-stream",
      },
    }
  );

  // ③ 再生URL生成
  const playbackUrl = `${BUNNY_CDN_URL}/${videoId}/play.m3u8`;

  return {
    videoId,
    playbackUrl,
  };
}


