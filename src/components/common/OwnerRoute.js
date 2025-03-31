// src/components/common/OwnerRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase"; // ← 修正済み
import { doc, getDoc } from "firebase/firestore";

const OwnerRoute = ({ element }) => {
  const [user, loading] = useAuthState(auth);
  const [isOwner, setIsOwner] = useState(null);

  useEffect(() => {
    const checkOwner = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setIsOwner(docSnap.exists() && docSnap.data().isOwner === true);
      }
    };
    checkOwner();
  }, [user]);

  if (loading || isOwner === null) return <div>確認中...</div>;
  return user && isOwner ? element : <Navigate to="/lounge" replace />;
};

export default OwnerRoute;




