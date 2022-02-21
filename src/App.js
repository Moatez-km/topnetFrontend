import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/dashboard";
import Profile from "./components/admin/profile";
import Login from "./layouts/Home/Login";
import MainLayout from "./layouts/Home/MainLayout";
import Register from "./layouts/Home/Register";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
