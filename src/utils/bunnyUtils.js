import axios from "axios";

// .env 環境変数の取得
const API_KEY = process.env.REACT_APP_BUNNY_API_KEY;
const LIBRARY_ID = process.env.REACT_APP_BUNNY_LIBRARY_ID;
const CDN_HOST = process.env.REACT_APP_BUNNY_CDN_HOST;

// ✅ 環境変数の存在をチェック
const checkEnvVars = () => {
  if (!API_KEY || !LIBRARY_ID || !CDN_HOST) {
    throw new Error("Bunny環境変数（API_KEY, LIBRARY_ID, CDN_HOST）が未設定です");
  }
};

// ✅ Bunnyへ動画をアップロード
const uploadVideoToBunny = async (file, title) => {
  checkEnvVars();

  const formData = new FormData();
  formData.append("file", file);

  try {
    // Step 1: 動画オブジェクトを作成
    const createRes = await axios.post(
      `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos`,
      { title },
      {
        headers: {
          AccessKey: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const videoId = createRes.data.guid;

    // Step 2: 動画ファイルをアップロード
    await axios.put(
      `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos/${videoId}`,
      file,
      {
        headers: {
          AccessKey: API_KEY,
          "Content-Type": file.type,
        },
      }
    );

    // Step 3: 再生用URLを生成して返却
    const playbackUrl = `https://${CDN_HOST}/${videoId}/playlist.m3u8`;
    return { videoId, playbackUrl };
  } catch (error) {
    console.error("🔥 Bunnyアップロード失敗:", error);
    throw error;
  }
};

// ✅ エンコード状況とサムネイル情報を取得
const checkVideoStatus = async (videoId) => {
  checkEnvVars();

  try {
    const res = await axios.get(
      `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos/${videoId}`,
      {
        headers: {
          AccessKey: API_KEY,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("⚠️ エンコード確認失敗:", error);
    throw error;
  }
};

// ✅ Bunnyから動画削除
const deleteVideoFromBunny = async (videoId) => {
  checkEnvVars();

  try {
    await axios.delete(
      `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos/${videoId}`,
      {
        headers: {
          AccessKey: API_KEY,
        },
      }
    );
  } catch (error) {
    console.error("🗑 Bunny削除失敗:", error);
    throw error;
  }
};

// ✅ エクスポート
export {
  uploadVideoToBunny,
  checkVideoStatus,
  deleteVideoFromBunny,
};







