import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
function MainRegister() {
  const navigate = useNavigate();
  const [registerInput, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    error_list: [],
  });
  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("/api/register", data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal("Success", res.data.message, "success");

          navigate("/admin/dashboard");
        } else {
          setRegister({
            ...registerInput,
            error_list: res.data.validation_errors,
          });
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
              <h2 className="section-heading text-uppercase">Sign Up</h2>
              <h3 className="section-subheading text-muted">
                Lorem ipsum dolor sit amet consectetur.
              </h3>
            </div>
            <div className="text-center">
              <center>
                <div className="card-body">
                  <form
                    id="contactForm"
                    data-sb-form-api-token="API_TOKEN"
                    onSubmit={registerSubmit}
                  >
                    <div className="col-md-6 ">
                      <div className="row align-items-stretch mb-5">
                        <div className="form-group">
                          <input
                            className="form-control"
                            id="Name"
                            name="name"
                            type="text"
                            placeholder="Your Name *"
                            data-sb-validations="required,Name"
                            onChange={handleInput}
                            value={registerInput.name}
                          />
                        </div>
                        <span className="text-center text-white">
                          {registerInput.error_list.name}
                        </span>
                        <div className="form-group">
                          <input
                            className="form-control"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Your Email *"
                            data-sb-validations="required,email"
                            onChange={handleInput}
                            value={registerInput.email}
                          />
                        </div>
                        <span className="text-center text-white">
                          {" "}
                          {registerInput.error_list.email}
                        </span>
                        <div className="form-group">
                          <input
                            className="form-control"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Your Password *"
                            data-sb-validations="required,password"
                            onChange={handleInput}
                            value={registerInput.password}
                          />
                        </div>
                        <span className="text-center text-white">
                          {registerInput.error_list.password}
                        </span>
                      </div>

                      <div className="text-center">
                        <button
                          className="btn btn-primary btn-xl text-uppercase "
                          id="submitButton"
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainRegister;
