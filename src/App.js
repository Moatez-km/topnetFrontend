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
import LoginStagiaire from "./layouts/Home/LoginStagiaire";
import ProfileStage from "./components/stagiaire/ProfileStage";
import StagiaireLayout from "./layouts/stagiaire/StagiaireLayout";
import DashboardStage from "./components/stagiaire/DashboardStage";
//Quiz
import Play from "./components/Quiz/Play";
//encadrant
import ProfileEnc from "./components/encadrant/ProfileEnc";
import DashboardEnc from "./components/encadrant/Dashboard";
import AddSujet from "./components/encadrant/AddSujet";
import EncadrantLayout from "./layouts/Encadrant/EncadrantLayout";
import ShowAllSujets from "./components/encadrant/ShowAllSujets";
import SujetDetail from "./components/stagiaire/SujetDetail";
//service formation
import ProfileSer from "./components/serviceformation/ProfileSer";
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
          <Route path="/stagiaire/login" element={<LoginStagiaire />} />
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
          <Route path="/serviceformation/profile" element={<ProfileSer />} />
          <Route path="/stagiaire/profile" element={<ProfileStage />} />
          <Route path="/stagiaire" element={<StagiaireLayout />} />
          <Route path="/stagiaire/Dashboard" element={<DashboardStage />} />
          <Route path="/stagiaire/editSujet" element={<SujetDetail />} />
          <Route path="/stagiaire/PlayQuiz" element={<Play />} />

          <Route path="/encadrant" element={<EncadrantLayout />} />
          <Route path="/encadrant/profile" element={<ProfileEnc />} />
          <Route path="/encadrant/dashboard" element={<DashboardEnc />} />
          <Route path="/encadrant/addSujet" element={<AddSujet />} />
          <Route path="/encadrant/allSujet" element={<ShowAllSujets />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
