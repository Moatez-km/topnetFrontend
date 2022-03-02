import React, { useState } from "react";
import MasterLayout from "../../layouts/admin/MasterLayout";
function AddUser() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const handleInput = (e) => {
    e.persist();
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const submitUser = (e) => {
    e.persist();
    const data = {};
  };

  return (
    <MasterLayout>
      <div className="container-fluid px-4">
        <h2>Add New User</h2>
        <form onSubmit={submitUser}>
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
              <div className="form-group mb-3">
                <labal>Name</labal>
                <input
                  type="text"
                  name="name"
                  onChange={handleInput}
                  value={userInput.name}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <labal>Email</labal>
                <input
                  type="email"
                  name="email"
                  onChange={handleInput}
                  value={userInput.email}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <labal>Password</labal>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={handleInput}
                  value={userInput.password}
                />
              </div>
              <div className="form-group mb-3">
                <labal>Select our role</labal>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={handleInput}
                  value={userInput.role}
                >
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                  <option value="4">Encadrant</option>
                  <option value="5">Chef departement</option>
                  <option value="6">Service formation</option>
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
            </div>
          </div>

          <button type="submit" className="btn btn-primary px-4 float-end">
            Submit
          </button>
        </form>
      </div>
    </MasterLayout>
  );
}

export default AddUser;
