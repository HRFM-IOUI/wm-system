// src/utils/bunnyUtils.js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_BUNNY_API_KEY;
const LIBRARY_ID = process.env.REACT_APP_BUNNY_LIBRARY_ID;
const CDN_HOST = process.env.REACT_APP_BUNNY_CDN_HOST;

const BASE_URL = `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos`;

/**
 * Bunnyに新規動画を作成する
 * @param {string} title
 * @returns {Promise<object>} 新規作成された動画情報
 */
export const createVideoInBunny = async (title) => {
  const response = await axios.post(
    BASE_URL,
    {
      title,
    },
    {
      headers: {
        AccessKey: API_KEY,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data; // { guid, title, thumbnailUrl, ... }
};

/**
 * Bunnyに動画ファイルをアップロード（PUT方式）
 * @param {string} guid - Bunny動画GUID
 * @param {File} file - アップロード対象ファイル
 * @param {function} onUploadProgress - プログレス用コールバック（任意）
 */
export const uploadVideoToBunny = async (guid, file, onUploadProgress) => {
  const uploadUrl = `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos/${guid}`;

  await axios.put(uploadUrl, file, {
    headers: {
      AccessKey: API_KEY,
      'Content-Type': file.type,
    },
    onUploadProgress,
  });
};

/**
 * Bunnyから動画を削除
 * @param {string} guid
 */
export const deleteVideoFromBunny = async (guid) => {
  await axios.delete(`${BASE_URL}/${guid}`, {
    headers: {
      AccessKey: API_KEY,
    },
  });
};

/**
 * BunnyのCDN URLを生成（再生用）
 * @param {string} guid
 * @returns {string} 再生用URL（m3u8形式）
 */
export const getBunnyStreamUrl = (guid) => {
  return `https://${CDN_HOST}/${guid}/playlist.m3u8`;
};






