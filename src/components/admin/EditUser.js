import React from "react";
import MasterLayout from "../../layouts/admin/MasterLayout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import swal from "sweetalert";

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      role_as: "",
      matricule: "",
      description: "",
      loginTopnet: "",
      statut: "",
      error: "",
    };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }
  //const [userInput, setUserInput] = useState({});
  // const [error, setError] = useState({});
  /* const handleInput = (e) => {
    e.persist();
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  /*useEffect(() => {
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
  }, [navigate]);*/
  updateUser = (e) => {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const page_type = urlParams.get("id");
    e.preventDefault();
    let data = {
      name: this.state.name,
      email: this.state.email,
      matricule: this.state.matricule,
      loginTopnet: this.state.loginTopnet,
      description: this.state.description,
      role_as: this.state.role_as,
      statut: this.state.statut,
    };
    // data = { user: data };
    //console.log(data);
    axios.put(`/api/updateUser/${page_type}`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        this.props.navigate("/admin/dashboard");
        this.setState({ error: "" });
      } else if (res.data.status === 422) {
        this.setState({ error: res.data.errors });
        swal("Error mendatory", "", "error");
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        this.props.navigate("/admin/dashboard");
      }
    });
  };
  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page_type = urlParams.get("id");
    //console.log(user_id);
    // const user_id = props.match.params.id;
    axios.get(`/api/edituser/${page_type}`).then((res) => {
      if (res.data.status === 200) {
        // console.log(res.data.user);
        this.setState({
          name: res.data.user.name,
          email: res.data.user.email,
          role_as: res.data.user.role_as,
          matricule: res.data.user.matricule,
          loginTopnet: res.data.user.loginTopnet,
          description: res.data.user.description,
          statut: res.data.user.statut,
        });
      } else if (res.data.status === 404) {
        swal("error", res.data.message, "error");
      }
    });
  }
  handleStatusChange() {}
  render() {
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
                    onChange={(event) =>
                      this.setState({ name: event.target.value })
                    }
                    value={this.state.name}
                    className="form-control"
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={(event) =>
                      this.setState({ email: event.target.value })
                    }
                    value={this.state.email}
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Matricule</label>

                  <input
                    type="text"
                    name="matricule"
                    onChange={(event) =>
                      this.setState({ matricule: event.target.value })
                    }
                    value={this.state.matricule}
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Login Topnet</label>

                  <input
                    type="text"
                    name="loginTopnet"
                    onChange={(event) =>
                      this.setState({ loginTopnet: event.target.value })
                    }
                    value={this.state.loginTopnet}
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Description</label>

                  <input
                    type="text"
                    name="description"
                    onChange={(event) =>
                      this.setState({ description: event.target.value })
                    }
                    value={this.state.description}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Select our role</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(event) =>
                      this.setState({ role_as: event.target.value })
                    }
                    name="role_as"
                    value={this.state.role_as}
                  >
                    <option value="admin">Admin</option>
                    <option value="encadrant">Encadrant</option>
                    <option value="user">User</option>
                    <option value="chef departement">Chef departement</option>
                    <option value="service formation">Service formation</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label>Select our statut</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(event) =>
                      this.setState({ statut: event.target.value })
                    }
                    name="statut"
                    value={this.state.statut}
                  >
                    <option value="activer">Activer</option>
                    <option value="désactiver">Désactiver</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary px-4 float-end"
                  onClick={this.updateUser}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </MasterLayout>
    );
  }
}

const NWEditUser = (props) => {
  const navigate = useNavigate();
  return <EditUser navigate={navigate} {...props} />;
};
export default NWEditUser;
