// src/components/common/MainLayout.js
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
