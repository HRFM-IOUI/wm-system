import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcw0yOOCIG8E1UiXwK5quT4XnE14jIz14",
  authDomain: "wmfansystem.firebaseapp.com",
  projectId: "wmfansystem",
  storageBucket: "wmfansystem.appspot.com",
  messagingSenderId: "494534456119",
  appId: "1:494534456119:web:4bd67d6d2fa6a1a36de0b2"
};

// Firebase アプリの初期化（重複回避）
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// 認証関連の設定
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default app;