import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const Header = () => {
  const [user] = useAuthState(auth);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const checkOwnerStatus = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setIsOwner(docSnap.exists() && docSnap.data().isOwner === true);
      }
    };

    checkOwnerStatus();
  }, [user]);

  return (
    <header className="bg-white shadow px-4 py-2 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Toa Fans Shop</Link>
      <nav className="space-x-4">
        <Link to="/toppage">ホーム</Link>
        <Link to="/mypage">マイページ</Link>
        <Link to="/gacha-select">ガチャ</Link>
        <Link to="/lounge">ラウンジ</Link>

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
