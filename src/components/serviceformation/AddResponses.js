import React, { useState, useEffect } from "react";
import Userlayout from "../../layouts/ServiceFormation/Userlayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";
function AddResponses() {
  const navigate = useNavigate();
  const [QuestionList, setQuestionList] = useState([]);

  const [responseInput, setResponseInput] = useState({
    question_id: "",
    reponse: "",
    statut: "",
  });
  useEffect(() => {
    axios.get("/api/allQuestions").then((res) => {
      if (res.data.status === 200) {
        setQuestionList(res.data.question);
      }
    });
  }, []);
  const handleInput = (e) => {
    e.persist();
    setResponseInput({ ...responseInput, [e.target.name]: e.target.value });
  };
  const submitResponse = (e) => {
    e.preventDefault();
    const data = {
      question_id: responseInput.question_id,
      reponse: responseInput.reponse,
      statut: responseInput.statut,
    };

    axios.post("/api/addResponse", data).then((res) => {
      console.log(data);
      if (res.data.status === 200) {
        swal("success", res.data.message, "success");
        navigate("/Questionshow");
      } else if (res.data.status === 422) {
        swal("All fields are mendatory  ", "", "error");
      }
    });
  };
  return (
    <Userlayout>
      <div className="container-fluid px-4">
        <div className="card mt-4 ">
          <div className="card-header">
            <h2>Add New Reponse</h2>
            <Link
              to="/Questionshow"
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
            <form id="User_form" onSubmit={submitResponse}>
              <div className="form-group mb-3">
                <label>Select question</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="question_id"
                  onChange={handleInput}
                  value={responseInput.question_id}
                >
                  {QuestionList.map((item, pos) => {
                    return (
                      <option value={item._id} key={pos}>
                        {item.question}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group mb-3">
                <label>Réponse</label>
                <textarea
                  type="text"
                  name="reponse"
                  className="form-control"
                  onChange={handleInput}
                  value={responseInput.response}
                ></textarea>
              </div>

              <div className="form-group mb-3">
                <label>Select statut</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="statut"
                  onChange={handleInput}
                  value={responseInput.statut}
                >
                  <option value="false">False</option>
                  <option value="true">True</option>
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

export default AddResponses;
