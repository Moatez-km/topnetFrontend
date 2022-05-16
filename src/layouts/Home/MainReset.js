import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
const MainReset = () => {
  const navigate = useNavigate();
  const [resetInput, setReset] = useState({
    token: "",
    password: "",
    password_confirm: "",
    error_list: [],
  });
  const handleInput = (e) => {
    e.persist();
    setReset({ ...resetInput, [e.target.name]: e.target.value });
  };

  const passwordSubmit = async (e) => {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const page_type = urlParams.get("token");
    e.preventDefault();
    const data = {
      token: page_type,
      password: resetInput.password,
      password_confirm: resetInput.password_confirm,
    };
    await axios.get("/sanctum/csrf-cookie").then(async (response) => {
      await axios.post("/api/reset", data).then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");

          navigate("/login");
        } else if (res.data.status === 400) {
          swal("warning", res.data.message, "warning");
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
              <h2 className="section-heading text-uppercase">
                Rénitialiser votre mot de passe
              </h2>
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
                    onSubmit={passwordSubmit}
                  >
                    <div className="col-md-6 ">
                      <div className="row align-items-stretch mb-5">
                        <div className="form-group">
                          <input
                            className="form-control"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Your Password *"
                            onChange={handleInput}
                            value={resetInput.password}
                          />
                        </div>

                        <div className="form-group">
                          <input
                            className="form-control"
                            id="password_confirm"
                            type="password"
                            name="password_confirm"
                            placeholder="Your Password Confirm *"
                            onChange={handleInput}
                            value={resetInput.password_confirm}
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        <button
                          className="btn btn-primary btn-xl text-uppercase "
                          id="submitButton"
                          type="submit"
                        >
                          Change password
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
};

export default MainReset;
