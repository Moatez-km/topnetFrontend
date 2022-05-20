import React, { useEffect, useState } from "react";
import StageLayout from "../../layouts/stagiaire/StagiaireLayout";
import "../admin/profile.css";

function ProfileStage() {
  const [UserProfile, setUserProfile] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentuser"));
    console.log(currentUser);

    if (currentUser) {
      setUserProfile(currentUser);
    }
  }, []);
  return (
    <StageLayout>
      {" "}
      <div className="container">
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar">
                      <img
                        src={`http://localhost:8000/${UserProfile.image}`}
                        alt=""
                      />
                    </div>
                    <h5 className="user-name">{UserProfile.nom}</h5>
                    <h6 className="user-email">{UserProfile.email}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Personal Details</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="fullName">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        placeholder="Enter full name"
                        value={UserProfile.nom}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="eMail">Prenom</label>
                      <input
                        type="text"
                        className="form-control"
                        id="prenom"
                        placeholder="Enter votre prenom"
                        value={UserProfile.prenom}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="matricule">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter votre email"
                        value={UserProfile.email}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="website">tel</label>
                      <input
                        type="url"
                        className="form-control"
                        id="tel"
                        placeholder="Numero telephone"
                        value={UserProfile.tel}
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mt-3 mb-2 text-primary">More Details</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="Street">addresse</label>
                      <input
                        type="text"
                        className="form-control"
                        id="adresse"
                        value={UserProfile.adresse}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="Street">Numéro passeport</label>
                      <input
                        type="text"
                        className="form-control"
                        id="passeport"
                        value={UserProfile.passeport}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="ciTy">Numéro Cin</label>
                      <input
                        type="text"
                        className="form-control"
                        id="cin"
                        value={UserProfile.cin}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                    <div className="text-right float-end">
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        className="btn btn-secondary px-4 "
                      >
                        Cancel
                      </button>
                      &nbsp; &nbsp;
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        className="btn btn-primary px-4 "
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StageLayout>
  );
}

export default ProfileStage;
