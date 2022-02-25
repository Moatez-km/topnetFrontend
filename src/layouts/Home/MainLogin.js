import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
function MainLogin() {
  const navigate = useNavigate();
  const [loginInput, setLogin] = useState({
    email: "",
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
      email: loginInput.email,
      password: loginInput.password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("api/login", data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal("Success", res.data.message, "success");

          navigate("/admin/dashboard");
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
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Your Email *"
                            data-sb-validations="required,email"
                            onChange={handleInput}
                            value={loginInput.email}
                          />
                        </div>
                        <span className="text-center text-white">
                          {loginInput.error_list.email}
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
              <h5 className="section-heading ">
                Don't have an account ? <Link to="/register">Sign Up</Link>
              </h5>
              <br />
              <Link to="#">Forgot your password ?</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainLogin;
