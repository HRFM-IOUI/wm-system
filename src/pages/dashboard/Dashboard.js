// src/pages/dashboard/Dashboard.js
import React, { useState, useEffect } from "react";
import ProductPost from "../../components/common/ProductPost";
import ProductManager from "../../components/common/ProductManager";
import VideoUploader from "../../components/video/VideoUploader";
import VideoPlayer from "../../components/video/VideoPlayer";
import PurchaseRequestManager from "../../components/dashboard/PurchaseRequestManager";
import OrderManager from "../../components/dashboard/OrderManager";
import { deleteVideoFromBunny } from "../../utils/bunnyUtils";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [videoList, setVideoList] = useState([]);
  const [withdrawableAmount, setWithdrawableAmount] = useState(0);
  const [requesting, setRequesting] = useState(false);
  const [withdrawStatus, setWithdrawStatus] = useState("");
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [user] = useAuthState(auth);

  const fetchVideos = async () => {
    const querySnapshot = await getDocs(collection(db, "videos"));
    const videos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setVideoList(videos);
  };

  const handleDeleteVideo = async (video) => {
    try {
      if (!window.confirm("本当に削除しますか？")) return;
      await deleteDoc(doc(db, "videos", video.id));
      await deleteVideoFromBunny(video.videoId);
      await fetchVideos();
    } catch (err) {
      console.error("動画削除エラー:", err);
      alert("削除に失敗しました");
    }
  };

  useEffect(() => {
    if (activeTab === "video") {
      fetchVideos();
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchWithdrawableAmount = async () => {
      if (!user) return;
      const snapshot = await getDocs(
        query(collection(db, "orders"), where("ownerId", "==", user.uid), where("status", "==", "paid"))
      );
      const total = snapshot.docs.reduce((sum, doc) => sum + (doc.data().amount || 0), 0);
      setWithdrawableAmount(total);
    };
    fetchWithdrawableAmount();
  }, [user]);

  useEffect(() => {
    const fetchChartData = async () => {
      if (!user) return;
      const snapshot = await getDocs(
        query(collection(db, "orders"), where("ownerId", "==", user.uid), where("status", "==", "paid"))
      );

      const monthlyTotal = {};
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const ts = data.createdAt?.toDate();
        if (!ts || isNaN(ts)) return;
        const monthKey = `${ts.getFullYear()}年${ts.getMonth() + 1}月`;
        if (!monthlyTotal[monthKey]) monthlyTotal[monthKey] = 0;
        monthlyTotal[monthKey] += data.amount || 0;
      });

      const sortedKeys = Object.keys(monthlyTotal).sort((a, b) => {
        const getNum = (k) => parseInt(k.replace(/[^0-9]/g, ""), 10);
        return getNum(a) - getNum(b);
      });

      setChartData({
        labels: sortedKeys,
        datasets: [
          {
            label: "売上合計 (¥)",
            data: sortedKeys.map(key => monthlyTotal[key]),
            backgroundColor: "rgba(236, 72, 153, 0.6)",
          },
        ],
      });
    };
    if (activeTab === "analytics") {
      fetchChartData();
    }
  }, [activeTab, user]);

  const handleWithdrawRequest = async () => {
    if (!user || withdrawableAmount === 0) return;
    try {
      setRequesting(true);
      await addDoc(collection(db, "withdrawRequests"), {
        ownerId: user.uid,
        amount: withdrawableAmount,
        requestedAt: serverTimestamp(),
        status: "pending",
      });
      setWithdrawStatus("申請を受け付けました。");
      setWithdrawableAmount(0);
    } catch (error) {
      console.error("出金申請エラー:", error);
      setWithdrawStatus("出金申請に失敗しました。");
    } finally {
      setRequesting(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "posts":
        return <ProductManager />;
      case "product":
        return <ProductPost />;
      case "withdraw":
        return (
          <div className="bg-white p-4 rounded shadow space-y-4">
            <p className="text-lg font-bold">現在の出金可能額:</p>
            <h3 className="text-2xl font-bold text-pink-600">¥{withdrawableAmount}</h3>
            <button
              onClick={handleWithdrawRequest}
              disabled={withdrawableAmount === 0 || requesting}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
            >
              {requesting ? "申請中..." : "出金申請する"}
            </button>
            {withdrawStatus && <p className="text-sm text-gray-700">{withdrawStatus}</p>}
          </div>
        );
      case "analytics":
        return (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-4">月別売上推移</h2>
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: "top" }, title: { display: true, text: "月別売上推移" } } }} />
          </div>
        );
      case "video":
        return (
          <div className="space-y-6">
            <VideoUploader ownerId={user?.uid || "unknown"} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videoList.map((video) => (
                <div key={video.id} className="bg-white p-4 rounded shadow">
                  <h3 className="font-bold text-lg">{video.title}</h3>
                  <VideoPlayer playbackUrl={video.playbackUrl} />
                  <button
                    onClick={() => handleDeleteVideo(video)}
                    className="mt-2 text-sm text-red-600 hover:underline"
                  >
                    この動画を削除
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case "payments":
        return <PurchaseRequestManager />;
      case "orders":
        return <OrderManager />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-1/4 bg-white shadow p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4">ダッシュボード</h2>
        {["posts", "product", "withdraw", "analytics", "video", "payments", "orders"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === tab ? "bg-pink-500 text-white" : "hover:bg-gray-100"
            }`}
          >
            {{
              posts: "出品管理",
              product: "商品登録",
              withdraw: "出金管理",
              analytics: "アナリティクス",
              video: "動画投稿",
              payments: "決済リクエスト",
              orders: "注文管理",
            }[tab]}
          </button>
        ))}
      </aside>
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;












