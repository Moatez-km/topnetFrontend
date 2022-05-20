import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../../assets/admin/css/styles.css";
import "../../assets/admin/js/scripts";

const EncadrantLayout = ({ children }) => {
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>
        <div id="layoutSidenav_content">
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default EncadrantLayout;
