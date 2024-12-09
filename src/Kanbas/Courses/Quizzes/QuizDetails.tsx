import { FaPencilAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as quizClient from "./client";
import React, { useState, useEffect } from "react";
import AnswerTypeElement from "./answerTypeElement";
import MarkedAnswerFillInTheBlanks from "./MarkedAnswerFillInTheBlanks";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  // const quiz = quizzes.find((q: any) => q._id === qid);
  const [quiz, setQuiz] = useState<any>({
    title: "Untitled Quiz",
    course: cid,
    description: "",
    quizType: "Graded Quiz",
    assignmentGroup: "QUIZZES",
    settings: {
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: {
        enabled: false,
        attemptsAllowed: 1,
      },
      showCorrectAnswers: {
        enabled: true,
        timing: "",
      },
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
    },
    dates: {
      available: new Date().toISOString(),
      due: new Date().toISOString(),
      until: new Date().toISOString(),
    },
    isPublished: false,
  });
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [attempts, setAttempts] = useState<any[]>([]);
  const [latestAttempt, setLatestAttempt] = useState<any | null>(null);
  const [markedAnswers, setMarkedAnswers] = useState<any[]>([]);

  const fetchAttempts = async () => {
    if (currentUser.role == "STUDENT") {
      const fetchedAttempts = await quizClient.findAttemptsForQuizByUser(
        qid,
        currentUser._id
      );
      setAttempts(fetchedAttempts);

      if (fetchedAttempts.length > 0) {
        // Reduce fetched attempts to find the latest one
        const latest = fetchedAttempts.reduce((prev: any, current: any) => {
          return new Date(current.submittedAt) > new Date(prev.submittedAt)
            ? current
            : prev;
        }, fetchedAttempts[0]); // Initialize with the first attempt

        setLatestAttempt(latest); // Update the state with the latest attempt
      } else {
        setLatestAttempt(null); // Clear the latest attempt if no attempts are found
      }
    }
  };

  const fetchQuiz = async () => {
    if (qid && latestAttempt) {
      const Quiz = await quizClient.getQuizById(latestAttempt.quiz);
      setQuiz({ ...Quiz });
    }
  };
  useEffect(() => {
    if (qid && currentUser._id) {
      // Ensure IDs are available
      fetchAttempts();
    }
  }, [qid, currentUser._id]);

  useEffect(() => {
    questionAndAnswer();
    fetchQuiz();
  }, [quiz, latestAttempt ]);

  useEffect(() => {
    console.log("markedasnwer:", markedAnswers);
  }, [markedAnswers]);
  function calculateTotalPoints(questions: any[]): number {
    if (questions && questions.length > 0) {
      return questions.reduce((total, question) => {
        const points = Number(question.points);
        if (isNaN(points)) {
          throw new Error(
            `Invalid points value in question: ${question.title}`
          );
        }
        return total + points;
      }, 0);
    }
    return 0;
  }
  //get the actual answwers and latest responbse and makes a consolidated object
  function questionAndAnswer() {
    if (quiz && latestAttempt) {
      console.log("loading quesstion and answer")
      let actual = quiz?.questions;
      const given = latestAttempt?.responses;
      if (actual && actual.length > 0) {
        setMarkedAnswers(
          actual.map((question: any) => {
            let res = given.filter(
              (response: any) => response.questionId == question._id
            );
            console.log(res[0]);
            let points = question.points;
            if (question.type == "fib") {
              if (!question.possibleAnswers.includes(res[0].answer)) {
                points = 0;
              }
            }
            if (question.type == "mcq") {
              const choice = question.choices.filter((choice: any) => {
                return choice.answer == res[0].answer;
              });
              points = 0;
              if (choice.length > 0 && choice[0].isCorrect) {
                points = 10;
              }
            }
            if (question.type == "tf") {
              if (String(question.answer) != res[0].answer) {
                points = 0;
              }
            }
            return {
              ...question,
              markedAnswer: res[0].answer,
              points: points,
              answer: String(question.answer),
            };
          })
        );
      }
    }
  }

  function isQuizAvailable(dates: any): boolean {
    const availableDate = new Date(dates.available);
    const untilDate = new Date(dates.until);
    const currentDate = new Date();
    if (currentDate < availableDate) {
      return false;
    } else if (currentDate > availableDate && currentDate < untilDate) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="container mt-4">
      {/* Buttons */}
      {currentUser && currentUser?.role == "FACULTY" && (
        <>
          <div className="d-flex justify-content-center mb-3">
            <button
              className="btn btn-secondary me-2"
              onClick={() =>
                navigate(`/Kanbas/Courses/${cid}/Quizzes/Attempt/${quiz._id}`)
              }
            >
              Preview
            </button>
            <button
              className="btn btn-secondary me-2"
              onClick={() =>
                navigate(`/Kanbas/Courses/${cid}/Quizzes/Edit/${quiz._id}`)
              }
            >
              <FaPencilAlt className="me-2" /> Edit{" "}
              {/* Pencil icon with label */}
            </button>
          </div>
          <hr />
        </>
      )}

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>{quiz?.title}</h3>
      </div>

      {/* Details Section */}
      <div className="row mb-4">
        <div className="col-md-8">
          {" "}
          {/* Constrain width and align left */}
          <table className="table table-borderless table-sm">
            {" "}
            {/* Reduced spacing */}
            <tbody>
              <tr>
                <th scope="row" className="text-end pe-3">
                  Quiz Type
                </th>
                <td className="text-start">{quiz?.quizType}</td>
              </tr>
              <tr>
                <th scope="row" className="text-end pe-3">
                  Points
                </th>
                <td className="text-start">
                  {calculateTotalPoints(quiz?.questions)}
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-end pe-3">
                  Assignment Group
                </th>
                <td className="text-start">{quiz?.assignmentGroup}</td>
              </tr>
              <tr>
                <th scope="row" className="text-end pe-3">
                  Shuffle Answers
                </th>
                <td className="text-start">
                  {quiz?.settings.shuffleAnswers ? "Yes" : "No"}
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-end pe-3">
                  Time Limit
                </th>
                <td className="text-start">
                  {quiz?.settings.timeLimit} Minutes
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-end pe-3">
                  Multiple Attempts
                </th>
                <td className="text-start">
                  {quiz?.settings.multipleAttempts.enabled ? "Yes" : "No"}
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-end pe-3">
                  View Responses
                </th>
                <td className="text-start">Yes</td>
              </tr>
              <tr>
                <th scope="row" className="text-end pe-3">
                  Show Correct Answers
                </th>
                <td className="text-start">
                  {quiz?.settings.showCorrectAnswers.enabled ? "Yes" : "No"}
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-end pe-3">
                  One Question at a Time
                </th>
                <td className="text-start">
                  {quiz?.settings.oneQuestionAtATime ? "Yes" : "No"}
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-end pe-3">
                  Require Respondus LockDown Browser
                </th>
                <td className="text-start">No</td>
              </tr>
              <tr>
                <th scope="row" className="text-end pe-3">
                  Required to View Quiz Results
                </th>
                <td className="text-start">No</td>
              </tr>
              <tr>
                <th scope="row" className="text-end pe-3">
                  Webcam Required
                </th>
                <td className="text-start">
                  {quiz?.settings.webcamRequired ? "Yes" : "No"}
                </td>
              </tr>
              <tr>
                <th scope="row" className="text-end pe-3">
                  Lock Questions After Answering
                </th>
                <td className="text-start">
                  {quiz?.settings.lockQuestionsAfterAnswering ? "Yes" : "No"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Availability Section */}
      <div className="row">
        <div className="col-md-8 mx-auto">
          {" "}
          {/* Center align the table */}
          <table className="table table-borderless table-sm">
            {" "}
            {/* Reduced spacing */}
            <thead className="border-bottom">
              {" "}
              {/* Add bottom border */}
              <tr>
                <th className="text-center align-middle">Due</th>
                <th className="text-center align-middle">For</th>
                <th className="text-center align-middle">Available from</th>
                <th className="text-center align-middle">Until</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center align-middle">
                  {quiz?.dates.due.slice(0, 16).split("T")[0]} at{" "}
                  {quiz?.dates.due.slice(0, 16).split("T")[1]}
                </td>
                <td className="text-center align-middle">Everyone</td>
                <td className="text-center align-middle">
                  {quiz?.dates.available.slice(0, 16).split("T")[0]} at{" "}
                  {quiz?.dates.available.slice(0, 16).split("T")[1]}
                </td>
                <td className="text-center align-middle">
                  {quiz?.dates.until.slice(0, 16).split("T")[0]} at{" "}
                  {quiz?.dates.until.slice(0, 16).split("T")[1]}
                </td>
              </tr>
            </tbody>
            <tfoot className="border-top">
              {" "}
              {/* Add top border */}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      {currentUser && currentUser?.role == "STUDENT" && (
        <>
          <div className="row">
            <div className="col-md-8 mx-auto">
              {" "}
              {/* Center align the table */}
              <table className="table table-borderless table-sm">
                {" "}
                {/* Reduced spacing */}
                <thead className="border-bottom">
                  {" "}
                  {/* Add bottom border */}
                  <tr>
                    <th className="text-center align-middle">Submitted On</th>
                    <th className="text-center align-middle">Score</th>
                  </tr>
                </thead>
                <tbody>
                  <td className="text-center align-middle">
                    {latestAttempt?.submittedAt.split("T")[0]} at{" "}
                    {latestAttempt?.submittedAt.split("T")[1]}
                  </td>
                  <td className="text-center align-middle">
                    {latestAttempt?.score}
                  </td>
                </tbody>
                <tfoot className="border-top">
                  {" "}
                  {/* Add top border */}
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {((attempts.length === 0 && isQuizAvailable(quiz?.dates)) ||
            (quiz?.settings.multipleAttempts.enabled &&
              attempts?.length <
                quiz?.settings.multipleAttempts.attemptsAllowed &&
              isQuizAvailable(quiz.dates))) && (
            <div className="d-flex justify-content-center mt-4">
              <button
                className="btn btn-danger"
                onClick={() =>
                  navigate(`/Kanbas/Courses/${cid}/Quizzes/Attempt/${quiz._id}`)
                }
              >
                Attempt Quiz
              </button>
            </div>
          )}
        </>
      )}
      <br />
      {currentUser && currentUser?.role == "STUDENT" && (
        <h3>Marked Answers:</h3>
      )}
      <div>
        <div className="row ">
          <div className="col-1"></div>
          <div className="col-10">
            {markedAnswers &&
              markedAnswers.map((markedAnswer, index) => {
                return (
                  <div className="align-items-center border border-dark rounded-1 mb-5">
                    <div className="d-flex justify-content-between p-3 bg-secondary border border-dark rounded-1">
                      <div>Question {index + 1}</div>
                      <div>pts: {markedAnswer.points}/10</div>
                    </div>
                    <div className="p-3">
                      <div>{markedAnswer.question}</div>
                    </div>

                    <div>
                      <div>
                        {markedAnswer.type == "tf" &&
                          ["true", "false"].map((option) => {
                            return (
                              <div>
                                <hr />
                                <div className="d-flex align-items-center ">
                                  {/* <div className=" fw-bold text-white bg-success d-flex align-items-center border border-dark rounded-1 p-2 ps-3 pe-3">Correct !</div>  */}
                                  <div className="col-3">
                                    {" "}
                                    <AnswerTypeElement
                                      text={
                                        markedAnswer.markedAnswer == option
                                          ? option == markedAnswer.answer
                                            ? "Correct!"
                                            : "You Answered"
                                          : option == markedAnswer.answer
                                          ? "Correct Answer"
                                          : ""
                                      }
                                      color={
                                        markedAnswer.markedAnswer == option
                                          ? option == markedAnswer.answer
                                            ? "btn-success"
                                            : "btn-danger"
                                          : option == markedAnswer.answer
                                          ? "btn-secondary"
                                          : ""
                                      }
                                    />{" "}
                                  </div>
                                  <div className="col-9 p-2">
                                    {" "}
                                    <label className="w-100 ps-1">
                                      {option}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        {markedAnswer.type == "mcq" &&
                          markedAnswer.choices.map((option: any) => {
                            return (
                              <div>
                                <hr />
                                <div className="d-flex align-items-center ">
                                  {/* <div className=" fw-bold text-white bg-success d-flex align-items-center border border-dark rounded-1 p-2 ps-3 pe-3">Correct !</div>  */}
                                  <div className="col-3">
                                    {" "}
                                    <AnswerTypeElement
                                      text={
                                        markedAnswer.markedAnswer ==
                                        option.answer
                                          ? option.isCorrect
                                            ? "Correct!"
                                            : "You Answered"
                                          : option.isCorrect
                                          ? "Correct Answer"
                                          : ""
                                      }
                                      color={
                                        markedAnswer.markedAnswer ==
                                        option.answer
                                          ? option.isCorrect
                                            ? "btn-success"
                                            : "btn-danger"
                                          : option.isCorrect
                                          ? "btn-secondary"
                                          : ""
                                      }
                                    />{" "}
                                  </div>
                                  <div className="col-9 p-2">
                                    {" "}
                                    <label className="w-100 ps-1">
                                      {option.answer}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        {markedAnswer.type == "fib" && (
                          <MarkedAnswerFillInTheBlanks
                            markedAnswer={markedAnswer}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
