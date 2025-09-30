import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-200 to-white">
      <Header />
      <main className="flex-1 container mx-auto p-4 pb-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
