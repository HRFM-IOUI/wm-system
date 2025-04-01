import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const [isOwner, setIsOwner] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkOwnerStatus = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setIsOwner(docSnap.exists() && docSnap.data().isOwner === true);
      }
      setIsChecking(false);
    };

    if (user) {
      checkOwnerStatus();
    } else {
      setIsChecking(false);
    }
  }, [user]);

  if (loading || isChecking) {
    return null; // 読み込み中は一切表示しない（オフローダーは親で表示）
  }

  if (!isOwner) return null; // オーナーでなければ非表示

  return (
    <header className="bg-white shadow px-4 py-2 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Toa Fans Shop</Link>
      <nav className="space-x-4">
        <Link to="/mypage">マイページ</Link>

        {isOwner && (
          <>
            <Link to="/dashboard">管理</Link>
            <Link to="/post">投稿管理</Link>
          </>
        )}

        {user ? (
          <button onClick={() => auth.signOut()}>ログアウト</button>
        ) : (
          <Link to="/login">ログイン</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

