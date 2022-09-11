import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./quiz-summary.css";
import StagiaireLayout from "../../layouts/stagiaire/StagiaireLayout";
function QuizSummary() {
  /*constructor(props) {
    super(props);
    this.state = {
      score: 0,
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    };
  }
  componentDidMount() {
    //const { state } = this.props.location;
    this.setstate = {
      score: 0, //(state.score / state.numberOfQuestions) * 100,
      numberOfQuestions: 0, //state.numberOfQuestions,
      numberOfAnsweredQuestions: 0, // state.numberOfAnsweredQuestions,
      correctAnswers: 0, //state.correctAnswers,
      wrongAnswers: 0, //state.wrongAnswers,
    };
  }*/

  const score = localStorage.getItem("score");
  const numberOfQuestions = localStorage.getItem("numberOfQuestions");
  const numberOfAnsweredQuestions = localStorage.getItem(
    "numberOfAnsweredQuestions"
  );
  const correctAnswers = localStorage.getItem("correctAnswers");
  const wrongAnswers = localStorage.getItem("wrongAnswers");

  console.log(localStorage.getItem("score")); //console.log(this.props.location.state);

  return (
    <StagiaireLayout>
      <Fragment>
        <center>
          <h1 color="green">Quiz has ended</h1>
          <div className="container stats">
            <h2>Your Score :{score}%</h2>
            <span className="stat left">Total number of questions: </span>
            <span className="right">{numberOfQuestions}</span>
            <br></br>
            <span className="stat left">
              Total number of Answered questions:{" "}
            </span>
            <span className="right">{numberOfAnsweredQuestions}</span>
            <br></br>
            <span className="stat left">correctAnswers: </span>
            <span className="right">{correctAnswers}</span>
            <br></br>
            <span className="stat left">wrongAnswers: </span>
            <span className="right">{wrongAnswers}</span>
            <br></br>
          </div>
          <section>
            <ul>
              <li>
                <Link to="/stagiaire/Dashboard">Back to home</Link>
              </li>
            </ul>
          </section>
        </center>
      </Fragment>
    </StagiaireLayout>
  );
}

export default QuizSummary;
