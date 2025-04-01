// src/components/common/OwnerRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const OwnerRoute = ({ element }) => {
  const [user, loadingAuth] = useAuthState(auth);
  const [isOwner, setIsOwner] = useState(false);
  const [loadingOwner, setLoadingOwner] = useState(true);

  useEffect(() => {
    const checkOwner = async () => {
      if (!user) {
        setLoadingOwner(false);
        return;
      }
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setIsOwner(docSnap.exists() && docSnap.data().isOwner === true);
      } catch (e) {
        setIsOwner(false);
      }
      setLoadingOwner(false);
    };

    if (user) {
      checkOwner();
    } else {
      setLoadingOwner(false);
    }
  }, [user]);

  if (loadingAuth || loadingOwner) {
    return <div className="p-6 text-center text-gray-600 font-medium">確認中...</div>;
  }

  if (!user || !isOwner) {
    return <Navigate to="/lounge" replace />;
  }

  return element;
};

export default OwnerRoute;





