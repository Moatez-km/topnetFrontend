import React, { Fragment } from "react";
import StagiaireLayout from "../../layouts/stagiaire/StagiaireLayout";
import "../Quiz/play.css";
import questions from "../Quiz/questions.json";
import isEmpty from "../Quiz/utils/is-empty";
import { MdOutlineQueryBuilder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 5,
      fiftyFifty: 2,
      usedFiftyFifty: false,
      time: {},
    };
    this.interval = null;
  }
  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.questions)) {
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState({
        currentQuestion,
        nextQuestion,
        previousQuestion,
        answer,
      });
    }
  };
  componentDidMount() {
    const { questions, currentQuestion, nextQuestion, previousQuestion } =
      this.state;
    this.displayQuestions(
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion
    );
    this.startTimer();
  }
  handleButtononClick = (e) => {
    switch (e.target.id) {
      case "next-button":
        this.handleNextButtononClick();
        break;
      case "previous-button":
        this.handlePreviousButtononClick();
        break;
      case "quit-button":
        this.handleQuitButtononClick();
        break;
      default:
        break;
    }
  };
  handleNextButtononClick = () => {
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };
  handlePreviousButtononClick = () => {
    if (this.state.previousQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };
  handleQuitButtononClick = () => {
    if (window.confirm("Are you sure you want to quit !")) {
      this.props.navigate("/stagiaire/Dashboard");
    }
  };

  handleOptionClick = (e) => {
    if (e === this.state.answer.toLowerCase()) {
      this.correctAnswer();
    } else {
      this.wrongAnswer();
    }
  };
  correctAnswer = () => {
    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        this.displayQuestions(
          this.state.questions,
          this.state.currentQuestion,
          this.state.nextQuestion,
          this.state.previousQuestion
        );
      }
    );
  };
  wrongAnswer = () => {
    this.setState(
      (prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        this.displayQuestions(
          this.state.questions,
          this.state.currentQuestion,
          this.state.nextQuestion,
          this.state.previousQuestion
        );
      }
    );
  };
  startTimer = () => {
    const countDownTime = Date.now() + 30000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime.valueOf() - now.valueOf();

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              minutes: 0,
              seconds: 0,
            },
          },
          () => {
            alert("Quiz has ended!");
            this.props.navigate("/stagiaire/Dashboard");
          }
        );
      } else {
        this.setState({
          time: {
            minutes,
            seconds,
          },
        });
      }
    }, 1000);
  };
  render() {
    const { currentQuestion, time } = this.state;
    return (
      <StagiaireLayout>
        <Fragment>
          <title>Quiz Page</title>
          <div className="questions">
            <h2>Quiz Mode</h2>

            <div className="lifeline-container">
              <p>
                <span style={{ float: "left" }}>1 of 15</span>
              </p>
              <p>
                <span className="lifeline">
                  {time.minutes}:{time.seconds}
                  <MdOutlineQueryBuilder></MdOutlineQueryBuilder>
                </span>
              </p>
            </div>
            <h5>{currentQuestion.question}</h5>
            <div className="options-container">
              <p
                onClick={() => this.handleOptionClick(currentQuestion.optionA)}
                className="option"
                name={currentQuestion.optionA}
              >
                {currentQuestion.optionA}
              </p>
              <p
                onClick={() => this.handleOptionClick(currentQuestion.optionB)}
                className="option"
                name={currentQuestion.optionB}
              >
                {currentQuestion.optionB}
              </p>
            </div>
            <div className="options-container">
              <p
                onClick={() => this.handleOptionClick(currentQuestion.optionC)}
                className="option"
                name={currentQuestion.optionC}
              >
                {currentQuestion.optionC}
              </p>
              <p
                onClick={() => this.handleOptionClick(currentQuestion.optionD)}
                className="option"
                name={currentQuestion.optionD}
              >
                {currentQuestion.optionD}
              </p>
            </div>
            <div className="button-container">
              <button id="previous-button" onClick={this.handleButtononClick}>
                Previous
              </button>
              <button id="next-button" onClick={this.handleButtononClick}>
                Next
              </button>
              <button id="quit-button" onClick={this.handleButtononClick}>
                Quit
              </button>
            </div>
          </div>
        </Fragment>
      </StagiaireLayout>
    );
  }
}
const NWPlay = (props) => {
  const navigate = useNavigate();
  return <Play navigate={navigate} {...props} />;
};
export default NWPlay;
