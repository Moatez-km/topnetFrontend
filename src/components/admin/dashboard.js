import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import MasterLayout from "../../layouts/admin/MasterLayout";
import axios from "axios";
import swal from "sweetalert";
function Dashboard() {
  const [UserList, setUserList] = useState([]);
  useEffect(() => {
    axios.get("/api/allUsers").then((res) => {
      // console.log(res.data.user);

      if (res.status === 200) {
        setUserList(res.data.user);
      }
    });
  }, []);

  const changeStatut = (e, _id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "changing";
    axios.put(`api/changeStatut/${_id}`).then((res) => {
      if (res.data.status === 200) {
        window.location.reload();
        thisClicked.closest("tr");
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        //thisClicked.innerText = "Delete";
      }
    });
  };
  /*changeStatut = (e) => {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const page_type = urlParams.get("id");
    e.preventDefault();
    let data = {
      
      statut: this.state.statut,
    };
    // data = { user: data };
    //console.log(data);
    axios.put(`/api/changeStatut/${page_type}`, data).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        this.props.navigate("/admin/dashboard");
        this.setState({ error: "" });
      } else if (res.data.status === 422) {
        this.setState({ error: res.data.errors });
        swal("Error mendatory", "", "error");
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        this.props.navigate("/admin/dashboard");
      }
    });
  };*/
  var viewAllUsersTable = UserList.map((item, pos) => {
    return (
      <tr key={pos}>
        <td>{item.matricule}</td>
        <td>
          <img
            src={`http://localhost:8000/${item.image}`}
            width="50px"
            alt="Image"
          />
        </td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.role_as}</td>
        <td>{item.statut}</td>
        <td>
          <Link
            to={`/admin/edituser?id=${item._id}`}
            className="btn btn-info btn sm"
          >
            <MdEdit size="1rem" color="white" />
          </Link>
        </td>
        <td>
          <button
            type="button"
            className=" btn btn-danger btn sm"
            color="red"
            onClick={(e) => changeStatut(e, item._id)}
          >
            <MdDeleteForever size="1rem" color="white" />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <MasterLayout>
      <div className="container px-4">
        <div className="card mt-4 ">
          <div className="card-header">
            <h4>
              List Users
              <Link
                to="/admin/addNewUser"
                className="btn btn-primary btn-sm float-end"
              >
                Add User
              </Link>
            </h4>
          </div>
        </div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>

              <th>Role</th>
              <th>Statut</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{viewAllUsersTable}</tbody>
        </table>
      </div>
    </MasterLayout>
  );
}

export default Dashboard;
