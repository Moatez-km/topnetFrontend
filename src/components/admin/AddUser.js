import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";
import MasterLayout from "../../layouts/admin/MasterLayout";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    role_as: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const submitUser = (e) => {
    e.preventDefault();
    const data = {
      name: userInput.name,
      email: userInput.email,
      password: userInput.password,
      role_as: userInput.role_as,
    };
    axios.post("/api/store-user", data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");

        navigate("/admin/dashboard");
      } else if (res.data.status === 400) {
        setUserInput({ ...userInput, error_list: res.data.errors });
      }
    });
  };

  return (
    <MasterLayout>
      <div className="container-fluid px-4">
        <h2>Add New User</h2>

        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Profile
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane  card-body border fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <br></br>
            <br></br>
            <form onSubmit={submitUser} id="User_form">
              <div className="form-group mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleInput}
                  value={userInput.name}
                  className="form-control"
                />
              </div>
              <span>{userInput.error_list.name}</span>
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleInput}
                  value={userInput.email}
                  className="form-control"
                />
                <span>{userInput.error_list.email}</span>
              </div>
              <div className="form-group mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={handleInput}
                  value={userInput.password}
                />
                <span>{userInput.error_list.password}</span>
              </div>
              <div className="form-group mb-3">
                <label>Select our role</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleInput}
                  name="role_as"
                  value={userInput.role_as}
                >
                  <option value="admin">Admin</option>
                  <option value="encadrant">Encadrant</option>
                  <option value="user">User</option>
                  <option value="chef departement">Chef departement</option>
                  <option value="service formation">Service formation</option>
                </select>
              </div>
              <div
                className="tab-pane fade card-body border"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                ...
              </div>
              <button type="submit" className="btn btn-primary px-4 float-end">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
}

export default AddUser;
