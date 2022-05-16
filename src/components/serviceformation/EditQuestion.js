import React from "react";
import Userlayout from "../../layouts/ServiceFormation/Userlayout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import swal from "sweetalert";
class EditQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { question: "", niveau: "", time: "", type: "", error: "" };
    this.niveau = { niv1: 1, niv2: 2, niv3: 3 };
    this.time = { minute: 60, troiquartMinute: 45, demiMinute: 30 };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page_type = urlParams.get("id");
    //console.log(user_id);
    // const user_id = props.match.params.id;
    axios.get(`/api/editQuestion/${page_type}`).then((res) => {
      if (res.data.status === 200) {
        // console.log(res.data.user);
        this.setState({
          question: res.data.question.question,
          time: res.data.question.time,
          niveau: res.data.question.niveau,
          type: res.data.question.type,
        });
      } else if (res.data.status === 404) {
        swal("error", res.data.message, "error");
      }
    });
  }
  handleStatusChange() {}
  updateQuestion = (e) => {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const page_type = urlParams.get("id");
    e.preventDefault();
    let data = {
      question: this.state.question,
      time: this.state.time,
      niveau: this.state.niveau,
      type: this.state.type,
    };
    // data = { user: data };
    //console.log(data);
    axios.put(`/api/updateQuestion/${page_type}`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        this.props.navigate("/Questionshow");
        this.setState({ error: "" });
      } else if (res.data.status === 422) {
        this.setState({ error: res.data.errors });
        swal("Error mendatory", "", "error");
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        this.props.navigate("/Questionshow");
      }
    });
  };
  render() {
    return (
      <Userlayout>
        <div className="container-fluid px-4">
          <div className="card mt-4 ">
            <div className="card-header">
              <h2>Edit User</h2>
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
              Notez bien pour les niveaux des questions:<br></br>
              1.<b>Niveau 1 :</b>Stage PFE<br></br>
              2.<b>Niveau 2 :</b>Stage d'observation<br></br>
              3.<b>Niveau 3 :</b>Stage de perfectionnement
              <br></br>
              <br></br>
              <form>
                <div className="form-group mb-3">
                  <label>Question</label>

                  <textarea
                    type="text"
                    name="question"
                    onChange={(event) =>
                      this.setState({ question: event.target.value })
                    }
                    value={this.state.question}
                    className="form-control"
                  ></textarea>
                </div>

                <div className="form-group mb-3">
                  <label>Temps en seconde</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(event) =>
                      this.setState({ time: event.target.value })
                    }
                    name="time"
                    value={this.state.time}
                  >
                    <option value={this.time.minute}>60 secondes</option>
                    <option value={this.time.troiquartMinute}>
                      45 secondes
                    </option>
                    <option value={this.time.demiMinute}>30 secondes</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label>Niveau</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(event) =>
                      this.setState({ niveau: event.target.value })
                    }
                    name="niveau"
                    value={this.state.niveau}
                  >
                    <option value={this.niveau.niv1}>Niveau 1</option>
                    <option value={this.niveau.niv2}>Niveau 2</option>
                    <option value={this.niveau.niv3}>Niveau 3</option>
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label>Type de question</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(event) =>
                      this.setState({ type: event.target.value })
                    }
                    name="type"
                    value={this.state.type}
                  >
                    <option value="faible">Faible</option>
                    <option value="moyenne">Moyenne</option>
                    <option value="élevée">Elevé</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary px-4 float-end"
                  onClick={this.updateQuestion}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </Userlayout>
    );
  }
}
const NWEditQuestion = (props) => {
  const navigate = useNavigate();
  return <EditQuestion navigate={navigate} {...props} />;
};

export default NWEditQuestion;
