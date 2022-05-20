import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
function MainRegister() {
  const navigate = useNavigate();
  const [registerInput, setRegister] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    cin: "",
    passeport: "",
    adresse: "",
    tel: "",
    image: "",
    error_list: [],
  });
  const [picture, setPicture] = useState([]);
  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    e.persist();
    setPicture({ image: e.target.files[0] });
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    /* const data = {
      nom: registerInput.nom,
      prenom: registerInput.prenom,
      email: registerInput.email,
      password: registerInput.password,
      
    };*/
    const formData = new FormData();
    formData.append("image", picture.image);
    formData.append("nom", registerInput.nom);
    formData.append("prenom", registerInput.prenom);
    formData.append("email", registerInput.email);
    formData.append("password", registerInput.password);
    formData.append("cin", registerInput.cin);
    formData.append("passeport", registerInput.passeport);
    formData.append("tel", registerInput.tel);
    formData.append("adresse", registerInput.adresse);

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("/api/stagiaire/register", formData).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal("Success", res.data.message, "success");

          navigate("/serviceformation");
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
                            id="nom"
                            name="nom"
                            type="text"
                            placeholder="Votre nom *"
                            data-sb-validations="required,Name"
                            onChange={handleInput}
                            value={registerInput.nom}
                          />
                        </div>
                        <span className="text-center text-white">
                          {registerInput.error_list.nom}
                        </span>
                        <div className="form-group">
                          <input
                            className="form-control"
                            id="prenom"
                            name="prenom"
                            type="text"
                            placeholder="Votre prenom *"
                            data-sb-validations="required,Name"
                            onChange={handleInput}
                            value={registerInput.prenom}
                          />
                        </div>
                        <span className="text-center text-white">
                          {registerInput.error_list.prenom}
                        </span>
                        <div className="form-group">
                          <input
                            className="form-control"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Votre Email *"
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
                        <div className="form-group">
                          <input
                            className="form-control"
                            id="cin"
                            name="cin"
                            type="text"
                            placeholder="votre numéro de cin *"
                            data-sb-validations="required,Name"
                            onChange={handleInput}
                            value={registerInput.cin}
                          />
                        </div>
                        <span className="text-center text-white">
                          {registerInput.error_list.cin}
                        </span>
                        <div className="form-group">
                          <input
                            className="form-control"
                            id="passeport"
                            name="passeport"
                            type="text"
                            placeholder="Votre numéro de paseport "
                            onChange={handleInput}
                            value={registerInput.passeport}
                          />
                        </div>
                        <span className="text-center text-white">
                          {registerInput.error_list.passeport}
                        </span>
                        <div className="form-group">
                          <input
                            className="form-control"
                            id="adresse"
                            name="adresse"
                            type="text"
                            placeholder="Votre adresse compléte *"
                            data-sb-validations="required,Name"
                            onChange={handleInput}
                            value={registerInput.adresse}
                          />
                        </div>
                        <span className="text-center text-white">
                          {registerInput.error_list.adresse}
                        </span>
                        <div className="form-group">
                          <input
                            className="form-control"
                            id="tel"
                            name="tel"
                            type="tel"
                            placeholder="Votre numéro de téléphone*"
                            data-sb-validations="required,Name"
                            onChange={handleInput}
                            value={registerInput.tel}
                          />
                        </div>
                        <span className="text-center text-white">
                          {registerInput.error_list.tel}
                        </span>
                        <div className="form-control">
                          <input
                            type="file"
                            name="image"
                            className="form-control"
                            onChange={handleImage}
                          />
                        </div>
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
