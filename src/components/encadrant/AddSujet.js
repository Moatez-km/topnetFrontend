import React, { useEffect, useState } from "react";
import EncadrantLayout from "../../layouts/Encadrant/EncadrantLayout";
import "../admin/profile.css";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AddSujet() {
  const navigate = useNavigate();
  const [UserProfile, setUserProfile] = useState([]);
  const [sujetInput, setsujetInput] = useState({
    titre: "",
    domaine: "",
    type: "",
    description: "",

    technologies: "",

    periode: "",
    encadrant_name: "",

    error_list: [],
  });
  const handleInput = (e) => {
    e.persist();
    setsujetInput({ ...sujetInput, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentuser"));
    console.log(currentUser);

    if (currentUser) {
      setUserProfile(currentUser);
    }
  }, []);
  const submitSujet = (e) => {
    e.preventDefault();
    const data = {
      titre: sujetInput.titre,
      domaine: sujetInput.domaine,
      type: sujetInput.type,
      description: sujetInput.description,
      technologies: sujetInput.technologies,
      periode: sujetInput.periode,
      encadrant_name: UserProfile.name,
    }; /*
    const formData = new FormData();
    formData.append("titre", sujetInput.titre);
    formData.append("domaine", sujetInput.domaine);
    formData.append("type", sujetInput.type);
    formData.append("description", sujetInput.description);
    formData.append("technologies", sujetInput.technologies);
    formData.append("periode", sujetInput.periode);
    formData.append("encadrant_name", UserProfile.name);*/

    axios.post("/api/addSujet", data).then((res) => {
      console.log(data);
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");

        navigate("/encadrant/dashboard");
      } else if (res.data.status === 422) {
        setsujetInput({ ...sujetInput, error_list: res.data.errors });
      }
    });
  };
  return (
    <EncadrantLayout>
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
            <form onSubmit={submitSujet} id="User_form">
              <div className="form-group mb-3">
                <label>Titre</label>
                <input
                  type="text"
                  name="titre"
                  onChange={handleInput}
                  value={sujetInput.titre}
                  className="form-control"
                />
              </div>
              <span>{sujetInput.error_list.titre}</span>
              <div className="form-group mb-3">
                <label>Type de stage</label>
                <input
                  type="text"
                  name="type"
                  onChange={handleInput}
                  value={sujetInput.type}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label>Domaine</label>
                <input
                  type="text"
                  name="domaine"
                  onChange={handleInput}
                  value={sujetInput.domaine}
                  className="form-control"
                />
                <span>{sujetInput.error_list.domaine}</span>
              </div>
              <div className="form-group mb-3">
                <label>Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  onChange={handleInput}
                  value={sujetInput.description}
                />
                <span>{sujetInput.error_list.description}</span>
              </div>
              <div className="form-group mb-3">
                <label>Technologies</label>
                <input
                  type="text"
                  name="technologies"
                  onChange={handleInput}
                  value={sujetInput.technologies}
                  className="form-control"
                />
              </div>
              <span>{sujetInput.error_list.technologies}</span>
              <div className="form-group mb-3">
                <input
                  type="text"
                  name="encadrant_name"
                  onChange={handleInput}
                  value={UserProfile.name}
                  className="form-control"
                  hidden
                />
              </div>

              <div className="form-group mb-3">
                <label>Periode de stage</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleInput}
                  name="periode"
                  value={sujetInput.periode}
                >
                  <option value="1 mois">1 mois</option>
                  <option value="2 mois">2 mois</option>

                  <option value="3 mois">3 mois</option>
                  <option value="6 mois">6 mois</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary px-4 float-end">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </EncadrantLayout>
  );
}

export default AddSujet;
