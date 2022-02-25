import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import MasterLayout from "./MasterLayout";

const AdminPage = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <MasterLayout />
      <Footer />
    </div>
  );
};

export default AdminPage;
