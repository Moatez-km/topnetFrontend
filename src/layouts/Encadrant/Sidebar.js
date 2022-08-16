import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard, MdImportContacts, MdTableRows } from "react-icons/md";
import { MdAccountCircle, MdTableChart, MdBookmarks } from "react-icons/md";
const sidebar = () => {
  return (
    <nav
      className="sb-sidenav accordion sb-sidenav-dark bg-dark2"
      id="sidenavAccordion"
    >
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading">Core</div>
          <Link className="nav-link" to="/encadrant/dashboard">
            <div className="sb-nav-link-icon">
              <MdDashboard size="1rem" color="white " />
            </div>
            Dashboard
          </Link>
          <Link className="nav-link" to="/encadrant/profile">
            <div className="sb-nav-link-icon">
              <MdAccountCircle size="1rem" color="white " />
            </div>
            Profile
          </Link>

          <div className="sb-sidenav-menu-heading">Interface</div>
          <Link
            className="nav-link collapsed"
            to="#"
            data-bs-toggle="collapse"
            data-bs-target="#collapseLayouts"
            aria-expanded="false"
            aria-controls="collapseLayouts"
          >
            <div className="sb-nav-link-icon">
              <MdImportContacts size="1rem" color="white " />
            </div>
            Préparation Sujets
            <div className="sb-sidenav-collapse-arrow">
              <i className="fas fa-angle-down"></i>
            </div>
          </Link>
          <div
            className="collapse"
            id="collapseLayouts"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              <Link className="nav-link" to="/encadrant/addSujet">
                Ajouter Sujet
              </Link>
              <Link className="nav-link" to="/encadrant/allSujet">
                show all Sujets
              </Link>
            </nav>
          </div>
          <Link
            className="nav-link collapsed"
            to="#"
            data-bs-toggle="collapse"
            data-bs-target="#collapsePages"
            aria-expanded="false"
            aria-controls="collapsePages"
          >
            <div className="sb-nav-link-icon">
              <MdBookmarks size="1rem" color="white " />
            </div>
            Pages
            <div className="sb-sidenav-collapse-arrow">
              <i className="fas fa-angle-down"></i>
            </div>
          </Link>
          <div
            className="collapse"
            id="collapsePages"
            aria-labelledby="headingTwo"
            data-bs-parent="#sidenavAccordion"
          >
            <nav
              className="sb-sidenav-menu-nested nav accordion"
              id="sidenavAccordionPages"
            >
              <Link
                className="nav-link collapsed"
                to="#"
                data-bs-toggle="collapse"
                data-bs-target="#pagesCollapseAuth"
                aria-expanded="false"
                aria-controls="pagesCollapseAuth"
              >
                Authentication
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </Link>
              <div
                className="collapse"
                id="pagesCollapseAuth"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordionPages"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link className="nav-link" to="login.html">
                    Login
                  </Link>
                  <Link className="nav-link" to="register.html">
                    Register
                  </Link>
                  <Link className="nav-link" to="password.html">
                    Forgot Password
                  </Link>
                </nav>
              </div>
              <Link
                className="nav-link collapsed"
                to="#"
                data-bs-toggle="collapse"
                data-bs-target="#pagesCollapseError"
                aria-expanded="false"
                aria-controls="pagesCollapseError"
              >
                Error
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </Link>
              <div
                className="collapse"
                id="pagesCollapseError"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordionPages"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link className="nav-link" to="401.html">
                    401 Page
                  </Link>
                  <Link className="nav-link" to="404.html">
                    404 Page
                  </Link>
                  <Link className="nav-link" to="500.html">
                    500 Page
                  </Link>
                </nav>
              </div>
            </nav>
          </div>
          <div className="sb-sidenav-menu-heading">Addons</div>
          <Link className="nav-link" to="charts.html">
            <div className="sb-nav-link-icon">
              <MdTableChart size="1rem" color="white " />
            </div>
            Charts
          </Link>
          <Link className="nav-link" to="tables.html">
            <div className="sb-nav-link-icon">
              <MdTableRows size="1rem" color="white " />
            </div>
            Tables
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default sidebar;
