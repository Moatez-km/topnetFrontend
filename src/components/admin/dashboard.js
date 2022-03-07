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

  const deleteUser = (e, _id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";
    axios.delete(`api/deleteUser/${_id}`).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        thisClicked.innerText = "Delete";
      }
    });
  };
  var viewAllUsersTable = UserList.map((item, pos) => {
    return (
      <tr key={pos}>
        <td>{pos}</td>

        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.role_as}</td>
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
            className="btn btn-danger btn sm"
            onClick={(e) => deleteUser(e, item._id)}
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
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>

              <th>Role</th>
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
