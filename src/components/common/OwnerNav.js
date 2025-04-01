// src/components/common/OwnerNav.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const OwnerNav = () => {
  const [user] = useAuthState(auth);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const checkOwner = async () => {
      if (user) {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        setIsOwner(snap.exists() && snap.data().isOwner === true);
      }
    };
    checkOwner();
  }, [user]);

  if (!user || !isOwner) return null;

  return (
    <div className="text-sm text-right space-x-4 mt-2 mr-4">
      <Link to="/dashboard" className="underline">管理</Link>
      <Link to="/post" className="underline">投稿管理</Link>
    </div>
  );
};

export default OwnerNav;
