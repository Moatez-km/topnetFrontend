import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/dashboard";
import Profile from "./components/admin/profile";
import Login from "./layouts/Home/Login";
import MainLayout from "./layouts/Home/MainLayout";
import Register from "./layouts/Home/Register";
import Userlayout from "./layouts/user/Userlayout";
import AddUser from "./components/admin/AddUser";
import EditUser from "./components/admin/EditUser";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/addNewUser" element={<AddUser />} />
          <Route path="/admin/edituser" element={<EditUser />} />
          <Route path="/user" element={<Userlayout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
