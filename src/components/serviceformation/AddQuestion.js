import React, { useState } from "react";
import Userlayout from "../../layouts/ServiceFormation/Userlayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";
function AddQuestion() {
  const navigate = useNavigate();
  const [QuestionInput, setQuestionInput] = useState({
    question: "",
    time: "",
    niveau: "",
    type: "",
    error_list: [],
  });

  const niv = { niv1: 1, niv2: 2, niv3: 3 };
  const time = { minute: 60, troiquartMinute: 45, demiMinute: 30 };

  const handleInput = (e) => {
    e.persist();
    setQuestionInput({ ...QuestionInput, [e.target.name]: e.target.value });
  };
  const submitQuestion = (e) => {
    e.preventDefault();
    const data = {
      question: QuestionInput.question,
      time: QuestionInput.time,
      niveau: QuestionInput.niveau,
      type: QuestionInput.type,
    };
    axios.post("/api/addQuestion", data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");

        navigate("/Questionshow");
      } else if (res.data.status === 400) {
        setQuestionInput({ ...QuestionInput, error_list: res.data.errors });
      }
    });
  };
  return (
    <Userlayout>
      <div className="container-fluid px-4">
        <div className="card mt-4 ">
          <div className="card-header">
            <h2>Add New Question</h2>
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
            Notez bien pour les niveaux des questions:<br></br>
            1.<b>Niveau 1 :</b>Stage PFE<br></br>
            2.<b>Niveau 2 :</b>Stage d'observation<br></br>
            3.<b>Niveau 3 :</b>Stage de perfectionnement
            <br></br>
            <br></br>
            <form onSubmit={submitQuestion} id="User_form">
              <div className="form-group mb-3">
                <label>Question</label>
                <textarea
                  type="text"
                  name="question"
                  onChange={handleInput}
                  value={QuestionInput.question}
                  className="form-control"
                ></textarea>
              </div>
              <span>{QuestionInput.error_list.question}</span>
              <div className="form-group mb-3">
                <label>Select time</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleInput}
                  name="time"
                  value={QuestionInput.time}
                >
                  <option value={time.minute}>60 Seconde</option>
                  <option value={time.troiquartMinute}>45 Seconde</option>
                  <option value={time.demiMinute}>30 Seconde</option>
                </select>
              </div>

              <div className="form-group mb-3">
                <label>Select niveau</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleInput}
                  name="niveau"
                  value={QuestionInput.niveau}
                >
                  <option value={niv.niv1}>Niveau 1</option>
                  <option value={niv.niv2}>Niveau 2</option>
                  <option value={niv.niv3}>Niveau 3</option>
                </select>
              </div>
              <div className="form-group mb-3">
                <label>Select type</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleInput}
                  name="type"
                  value={QuestionInput.type}
                >
                  <option value="faible">Faible</option>
                  <option value="moyenne">Moyenne</option>
                  <option value="élevé">Elevé</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary px-4 float-end">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Userlayout>
  );
}

export default AddQuestion;
