import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/dashboard";
import Profile from "./components/admin/profile";
import Login from "./layouts/Home/Login";
import MainLayout from "./layouts/Home/MainLayout";
import Register from "./layouts/Home/Register";
import Userlayout from "./layouts/ServiceFormation/Userlayout";
import AddUser from "./components/admin/AddUser";
import EditUser from "./components/admin/EditUser";
import Forgot from "./layouts/Home/Forgot";
import Reset from "./layouts/Home/Reset";
import Questionshow from "./components/serviceformation/Questionshow";
import EditQuestion from "./components/serviceformation/EditQuestion";
import AddQuestion from "./components/serviceformation/AddQuestion";
import AddResponses from "./components/serviceformation/AddResponses";

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
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/addNewUser" element={<AddUser />} />
          <Route path="/admin/edituser" element={<EditUser />} />
          <Route path="/serviceformation" element={<Userlayout />} />
          <Route path="/Questionshow" element={<Questionshow />} />
          <Route path="/editQuestion" element={<EditQuestion />} />
          <Route path="/addNewQuestion" element={<AddQuestion />} />
          <Route path="/addNewResponse" element={<AddResponses />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
