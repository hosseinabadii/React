import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <header className="bg-gray-900">
        <Navbar />
      </header>
      <main className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
