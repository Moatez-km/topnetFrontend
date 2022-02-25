import React from "react";
import MiniLogo from "../../assets/Home/assets/img/navbar-logo.png";
import { Link } from "react-router-dom";
import { MdLogout, MdSearch } from "react-icons/md";
import {
  MdSettings,
  MdOutlineSegment,
  MdSupervisorAccount,
} from "react-icons/md";

import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Navbar() {
  const navigate = useNavigate();
  const logoutSubmit = (e) => {
    e.preventDefault();
    axios.post("api/logout").then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal("Success", res.data.message, "success");

        navigate("/login");
      }
    });
  };

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <Link className="navbar-brand ps-3" to="/admin/dashboard">
        <img src={MiniLogo} alt="..." width="75%" />
      </Link>

      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        href="#!"
      >
        <MdOutlineSegment size="1.5rem" color="white" />
      </button>

      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search for..."
            aria-label="Search for..."
            aria-describedby="btnNavbarSearch"
          />
          <button
            className="btn btn-primary"
            id="btnNavbarSearch"
            type="button"
          >
            <MdSearch size="1rem" color="black" />
          </button>
        </div>
      </form>

      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
          <Link
            to="#"
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <MdSupervisorAccount size="1.5rem" color="white" />
          </Link>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <Link className="dropdown-item" to="#!">
                <MdSettings size="1rem" />
                Settings
              </Link>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item btn" onClick={logoutSubmit}>
                <MdLogout size="1rem" color="black" />
                Logout
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
