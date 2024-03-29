import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
function MainLogin() {
  const navigate = useNavigate();
  const [loginInput, setLogin] = useState({
    loginTopnet: "",
    password: "",
    error_list: [],
  });
  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    const data = {
      loginTopnet: loginInput.loginTopnet,
      password: loginInput.password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("api/login", data).then((res) => {
        if (res.data.status === 200) {
          if (res.data.role === "admin") {
            localStorage.setItem("auth_token", res.data.token);
            localStorage.setItem("currentuser", JSON.stringify(res.data.user));

            swal("Success", res.data.message, "success");

            navigate("/admin/dashboard");
          } else if (
            res.data.role === "encadrant" &&
            res.data.statut === "activer" &&
            res.data.firstlogin !== ""
          ) {
            localStorage.setItem("auth_token", res.data.token);
            localStorage.setItem("auth_name", res.data.username);
            localStorage.setItem("currentuser", JSON.stringify(res.data.user));
            swal("Success", res.data.message, "success");
            navigate("/encadrant/dashboard");
          } else if (
            res.data.role === "encadrant" &&
            res.data.statut === "activer" &&
            res.data.firstlogin === ""
          ) {
            localStorage.setItem("auth_token", res.data.token);
            localStorage.setItem("auth_name", res.data.username);
            localStorage.setItem("currentuser", JSON.stringify(res.data.user));
            swal("Success", res.data.message, "success");
            navigate("/forgot");
          } else if (
            res.data.role === "encadrant" &&
            res.data.statut === "désactiver"
          ) {
            swal("Warning", "votre compte est désactiver", "warning");
          } else if (
            res.data.role === "service formation" &&
            res.data.statut === "activer" &&
            res.data.firstlogin !== ""
          ) {
            localStorage.setItem("auth_token", res.data.token);
            localStorage.setItem("auth_name", res.data.username);
            localStorage.setItem("currentuser", JSON.stringify(res.data.user));
            swal("Success", res.data.message, "success");
            navigate("/serviceformation");
          } else if (
            res.data.role === "service formation" &&
            res.data.statut === "activer" &&
            res.data.firstlogin === ""
          ) {
            localStorage.setItem("auth_token", res.data.token);
            localStorage.setItem("auth_name", res.data.username);
            localStorage.setItem("currentuser", JSON.stringify(res.data.user));
            swal("Success", res.data.message, "success");
            navigate("/forgot");
          } else if (
            res.data.role === "service formation" &&
            res.data.statut === "désactiver"
          ) {
            swal("Warning", "votre compte est désactiver", "warning");
          }
        } else if (res.data.status === 401) {
          swal("Warning", "invalid Credentiels", "warning");
        } else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors });
        }
      });
    });
  };
  return (
    <section className="page-section" id="contact">
      <div className="container">
        <div className="text-center">
          <div className="card">
            <div className="card-header">
              <h2 className="section-heading text-uppercase">Login</h2>
              <h3 className="section-subheading text-muted">
                Lorem ipsum dolor sit amet consectetur.
              </h3>
            </div>
            <div className="text-center">
              <center>
                <div className="card-body">
                  <form
                    id="contactForm"
                    onSubmit={loginSubmit}
                    data-sb-form-api-token="API_TOKEN"
                  >
                    <div className="col-md-6 ">
                      <div className="row align-items-stretch mb-5">
                        <div className="form-group">
                          <input
                            className="form-control"
                            id="loginTopnet"
                            type="text"
                            name="loginTopnet"
                            placeholder="Your loginTopnet*"
                            onChange={handleInput}
                            value={loginInput.loginTopnet}
                          />
                        </div>
                        <span className="text-center text-white">
                          {loginInput.error_list.loginTopnet}
                        </span>
                        <div className="form-group mb-md-0">
                          <input
                            className="form-control"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Your Password *"
                            data-sb-validations="required"
                            onChange={handleInput}
                            value={loginInput.password}
                          />
                        </div>
                        <span className="text-center text-white">
                          {loginInput.error_list.password}
                        </span>
                      </div>

                      <div className="text-center">
                        <button
                          className="btn btn-primary btn-xl text-uppercase "
                          id="submitButton"
                          type="submit"
                        >
                          Sign in
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </center>

              <br />
              <Link to="/forgot">Forgot your password ?</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainLogin;
