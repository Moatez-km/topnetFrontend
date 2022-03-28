import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
function MainForgot() {
  const [emailInput, setEmail] = useState({
    email: "",

    error_list: [],
  });
  const handleInput = (e) => {
    e.persist();
    setEmail({ ...emailInput, [e.target.name]: e.target.value });
  };
  const emailSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: emailInput.email,
    };
    await axios.get("/sanctum/csrf-cookie").then(async (response) => {
      await axios.post("/api/forgot", data).then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
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
                    onSubmit={emailSubmit}
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
                            value={emailInput.email}
                          />
                        </div>
                        <span className="text-center text-white">
                          {emailInput.error_list.email}
                        </span>
                      </div>

                      <div className="text-center">
                        <button
                          className="btn btn-primary btn-xl text-uppercase "
                          id="submitButton"
                          type="submit"
                        >
                          Submit
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

export default MainForgot;
