import React from "react";
import Close from "../../assets/Home/assets/img/close-icon.svg";
import Port5 from "../../assets/Home/assets/img/portfolio/5.jpg";
const Item5 = () => {
  return (
    <div
      className="portfolio-modal modal fade"
      id="portfolioModal5"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="close-modal" data-bs-dismiss="modal">
            <img src={Close} alt="Close modal" />
          </div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="modal-body">
                  <h2 className="text-uppercase">Project Name</h2>
                  <p className="item-intro text-muted">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                  <img
                    className="img-fluid d-block mx-auto"
                    src={Port5}
                    alt="..."
                  />
                  <p>
                    Use this area to describe your project. Lorem ipsum dolor
                    sit amet, consectetur adipisicing elit. Est blanditiis
                    dolorem culpa incidunt minus dignissimos deserunt repellat
                    aperiam quasi sunt officia expedita beatae cupiditate,
                    maiores repudiandae, nostrum, reiciendis facere nemo!
                  </p>
                  <ul className="list-inline">
                    <li>
                      <strong>Client:</strong>
                      Southwest
                    </li>
                    <li>
                      <strong>Category:</strong>
                      Website Design
                    </li>
                  </ul>
                  <button
                    className="btn btn-primary btn-xl text-uppercase"
                    data-bs-dismiss="modal"
                    type="button"
                  >
                    <i className="fas fa-times me-1"></i>
                    Close Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item5;
