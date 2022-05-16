import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";
import MasterLayout from "../../layouts/admin/MasterLayout";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function AddUser() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    matricule: "",
    description: "",

    loginTopnet: "",

    password: "",
    role_as: "",
    statut: "",
    error_list: [],
  });
  const [picture, setPicture] = useState([]);

  const handleInput = (e) => {
    e.persist();
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    e.persist();
    setPicture({ image: e.target.files[0] });
  };
  const submitUser = (e) => {
    e.preventDefault();
    /*const data = {
      name: userInput.name,
      email: userInput.email,
      password: userInput.password,
      role_as: userInput.role_as,
      matricule: userInput.matricule,
      loginTopnet: userInput.loginTopnet,
      description: userInput.description,
      image: picture.image,
    };*/
    const formData = new FormData();
    formData.append("image", picture.image);
    formData.append("name", userInput.name);
    formData.append("email", userInput.email);
    formData.append("password", userInput.password);
    formData.append("role_as", userInput.role_as);
    formData.append("matricule", userInput.matricule);
    formData.append("loginTopnet", userInput.loginTopnet);
    formData.append("description", userInput.description);

    axios.post("/api/store-user", formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");

        navigate("/admin/dashboard");
      } else if (res.data.status === 422) {
        setUserInput({ ...userInput, error_list: res.data.errors });
      }
    });
  };

  return (
    <MasterLayout>
      <div className="container-fluid px-4">
        <div className="card mt-4 ">
          <div className="card-header">
            <h2>Add New User</h2>
            <Link
              to="/admin/dashboard"
              className="btn btn-primary btn-sm float-end"
            >
              Back
            </Link>
          </div>
        </div>

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
                <label>Matricule</label>
                <input
                  type="number"
                  name="matricule"
                  onChange={handleInput}
                  value={userInput.matricule}
                  className="form-control"
                />
              </div>
              <span>{userInput.error_list.matricule}</span>
              <div className="form-group mb-3">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  onChange={handleInput}
                  value={userInput.description}
                  className="form-control"
                />
              </div>
              <span>{userInput.error_list.description}</span>
              <div className="form-group mb-3">
                <label>LoginTopnet</label>
                <input
                  type="text"
                  name="loginTopnet"
                  onChange={handleInput}
                  value={userInput.loginTopnet}
                  className="form-control"
                />
              </div>
              <span>{userInput.error_list.loginTopnet}</span>
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

                  <option value="chef departement">Chef departement</option>
                  <option value="service formation">Service formation</option>
                </select>
              </div>
              <div className="form-group mb-3">
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={handleImage}
                />
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
