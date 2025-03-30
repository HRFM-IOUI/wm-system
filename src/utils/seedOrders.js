// utils/seedOrders.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

// テスト用のダミー注文データ追加
export const seedDummyOrders = async (ownerId) => {
  const dummyOrders = [
    { amount: 3000, status: "paid" },
    { amount: 4500, status: "paid" },
    { amount: 1500, status: "pending" },
  ];

  for (const order of dummyOrders) {
    await addDoc(collection(db, "orders"), {
      ...order,
      ownerId,
      createdAt: serverTimestamp(),
    });
  }

  console.log("ダミー注文データを追加しました");
};
