import React, { useEffect, useState } from "react";
import MasterLayout from "../../layouts/admin/MasterLayout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function EditUser() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({});
  // const [error, setError] = useState({});
  const handleInput = (e) => {
    e.persist();
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page_type = urlParams.get("id");
    //console.log(user_id);
    // const user_id = props.match.params.id;
    axios.get(`/api/edituser/${page_type}`).then((res) => {
      if (res.data.status === 200) {
        setUserInput(res.data.user);
      } else if (res.data.status === 404) {
        swal("error", res.data.message, "error");
        navigate("admin/dashboard");
      }
    });
  }, [navigate]);
  /*const updateUser = (e) => {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const page_type = urlParams.get("id");
    e.preventDefault();
    const data = userInput;
    axios.put(`/api/updateUser/${page_type}`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        navigate("/admin/dashboard");
        setError([]);
      } else if (res.data.status === 422) {
        setError(res.data.errors);
        swal("Error mendatory", "", "error");
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        navigate("/admin/dashboard");
      }
    });
  };*/
  return (
    <MasterLayout>
      <div className="container-fluid px-4">
        <div className="card mt-4 ">
          <div className="card-header">
            <h2>Edit User</h2>
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

            <form>
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

              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleInput}
                  value={userInput.email}
                  className="form-control"
                />
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

              <button type="submit" className="btn btn-primary px-4 float-end">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
}

export default EditUser;
