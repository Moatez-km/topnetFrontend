import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Userlayout from "../../layouts/ServiceFormation/Userlayout";
import axios from "axios";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import swal from "sweetalert";
function Questionshow() {
  const [QuestionList, setQuestionList] = useState([]);

  useEffect(() => {
    axios.get("/api/allQuestions").then((res) => {
      // console.log(res.data.user);
      if (res.status === 200) {
        setQuestionList(res.data.question);
      }
    });
  }, []);
  const DeleteQuestion = (e, _id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "delete";
    axios.delete(`api/deleteQuestion/${_id}`).then((res) => {
      if (res.data.status === 200) {
        //window.location.reload();
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, "error");
        thisClicked.innerText = "Delete";
      }
    });
  };
  var viewAllQuestionsTable = QuestionList.map((item, pos) => {
    return (
      <tr key={pos}>
        <td>{item._id}</td>

        <td>{item.question}</td>
        <td>{item.time}</td>
        <td>{item.niveau}</td>
        <td>{item.type}</td>
        <td>
          <Link
            to={`/editQuestion?id=${item._id}`}
            className="btn btn-info btn sm"
          >
            <MdEdit size="1rem" color="white" />
          </Link>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger btn sm"
            onClick={(e) => DeleteQuestion(e, item._id)}
          >
            <MdDeleteForever size="1rem" color="white" />
          </button>
        </td>
      </tr>
    );
  });
  return (
    <Userlayout>
      <div className="container px-4">
        <div className="card mt-4 ">
          <div className="card-header">
            <h4>
              List Questions
              <Link
                to="/addNewQuestion"
                className="btn btn-primary btn-sm float-end"
              >
                Add Questions
              </Link>
            </h4>
          </div>
        </div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Time</th>

              <th>Niveau</th>
              <th>Type</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{viewAllQuestionsTable}</tbody>
        </table>
      </div>
    </Userlayout>
  );
}

export default Questionshow;
