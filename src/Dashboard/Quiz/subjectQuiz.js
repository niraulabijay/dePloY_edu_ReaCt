import React, { useState, useEffect } from "react";
import {
    useHistory,
    Route,
    useRouteMatch,
} from "react-router-dom";
import Axios from "axios";
import { useAuth } from "../../Context/Auth";
import Timer from './Timer'
import SubjectResult from "./SubjectResult";
import Skeleton from 'react-loading-skeleton';

export default function SubjectQuiz(props) {
    let { path,url,params } = useRouteMatch();
    console.log(params)
    let { Authtoken } = useAuth();

    const [questions, setGetQuestion] = useState([]);
    const [quizLength, setQuizLength] = useState(0);
    const [ResultResponse, setResultResponse] = useState([]);
    const [testFinish, setTestFinish] = useState(false);
    const [QuizTime, setQuizTime] = useState();
    const [logId, setLogId] = useState();
    const getUrl = "http://noname.hellonep.com/api/test/"+params.subjectId+'/'+Authtoken.user_id;
    let history = useHistory();
    const localActive = localStorage.getItem("active");
    const [active, setActive] = useState(
        localActive ? JSON.parse(localActive) : []
    );

    useEffect(() => {
        if (params.class_id !== Authtoken.class_id) {
            history.push({
                pathname: "/practise"
            });
        }
        let source = Axios.CancelToken.source();

        const loadData = async () => {
            try {
                const response = await Axios.get(getUrl, {
                    headers: {Authorization: "bearer" + Authtoken.token }
                },
                {
                    cancelToken: source.token
                });
                setGetQuestion(response.data.questions);
                setQuizTime(parseInt(response.data.time));
                setLogId(parseInt(response.data.log_id))
                setQuizLength(response.data.questions.length);
                if (!localStorage.getItem(  "active")) {
                    for (let i = 0; i  < response.data.questions.length; i++) {
                        active.push(null);
                    }
                    localStorage.setItem("active", JSON.stringify(active)); 
                    setActive(active);
                }
            } catch (error) {
                if (Axios.isCancel(error)) {
                    console.log(error);
                } else {
                    throw error;
                }
            }
        };
        loadData();
        return () => {
            source.cancel();
        };
    }, [getUrl]);

    const allQuestion = questions.length;
    const localData = localStorage.getItem("initialValue");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
        localData ? JSON.parse(localData) : 0
    );

    const currentQuestion = useCurrentQuestion(
        currentQuestionIndex,
        questions,
        quizLength
    );

    const totalMarks = localStorage.getItem("score");
    const [Score, setScore] = useState(totalMarks ? JSON.parse(totalMarks) : []);
    const [SpecificMark, setSpecificMark] = useState([]);

    function handleChange(Correct, Index, activeId) {
        active.filter(
            ({ ...datas }) =>
                (active[Index] = {
                    questionId: currentQuestion.initialQuestion.id,
                    answerId: activeId,
                    indexId: Index
                })
        );

        SpecificMark.filter(({ ...datas }) => (Score[Index] = Correct));
        setSpecificMark([
            ...SpecificMark,
            {
                index: Index,
                correct: Correct
            }
        ]);

        Score[Index] = Correct;
        active[Index] = {
            questionId: currentQuestion.initialQuestion.id,
            answerId: activeId,
            indexId: Index
        };
        localStorage.setItem("active", JSON.stringify(active));
        localStorage.setItem("score", JSON.stringify(Score));
    }

    const markCounter = useMarkCounter(Score);

    function is_active(qid, aid) {
        var value = false;
        active.map(active => {
            if (active == null) {
                return value;
            } else if (active.indexId == qid && active.answerId == aid) {
                value = true;
            }
        });
        return value;
    }
    function openQuiz() {
        document.getElementById("quizSideNav").style.width = "250px";
    }

    /* Set the width of the side navigation to 0 */
    function closeQuiz() {
        document.getElementById("quizSideNav").style.width = "0";
    }

    const submitPractise = () => {
        const PractiseData = JSON.parse(localStorage.getItem("active"));
        PractiseData.filter(({ ...datas }, index) => {
            if (PractiseData[index] == null) {
                PractiseData[index] = {
                    questionId: questions[index].id,
                    answerId: null
                };
            }
        });
        Axios({
            method: "post",
            headers: {Authorization: "bearer" + Authtoken.token },
            url: "http://noname.hellonep.com/api/test/store",
            data: {
                log_id: logId,
                user_id: Authtoken.user_id,
                practise: PractiseData,
                
            }
        }).then(response => {
            if (response.data.status === "success") {
                setResultResponse(response.data.result);
                setTestFinish(true);
            }
        });
    };

    useEffect(() => {
        if(testFinish) {
            localStorage.removeItem("active");
            localStorage.removeItem("initialValue");
            history.push({
                pathname: url + "/result",
                state: ResultResponse
            });
        }
    }, [ResultResponse, testFinish]);

    const items = [];
    let QuestionPosition = JSON.parse(totalMarks);

    for (let i = 1; i <= quizLength; i++) {
        items.push(
            <li
                key={i}
                onClick={() => JumpQuestion(i)}
                className={
                    QuestionPosition != null
                        ? QuestionPosition[i - 1] === null
                            ? "wrong"
                            : "active"
                        : ""
                }
            >
                {i}
            </li>
        );
    }

    const JumpQuestion = i => {
        setCurrentQuestionIndex(i - 1);
    };

    const handleQuit = e  => {
        e.preventDefault();
        console.log(logId)
        Axios({
            method: 'post',
            headers: {
				Authorization: "bearer" + Authtoken.token
			},	
            url: 'http://noname.hellonep.com/api/test/user_quit',
            data: {
                log_id: logId
            },
           
        }).then(
            response=>{
                console.log(response)
                if(response.data.status === "success"){
                    localStorage.removeItem('active');
                    localStorage.removeItem('initialValue');
                    history.replace({
                        pathname: '/learn'
                    })
                }
                }
        )
    }

    return (
        <React.Fragment>
            <Route exact path={path}>
                <div>
                    <span onClick={openQuiz} id="quizOpen">
                        <i class="fas fa-th-large"></i>
                    </span>
                    <div id="quizSideNav" className="quizsidenav">
                        <div className="closebtn" onClick={closeQuiz}>
                            &times;
                        </div>
                        <ul>{items}</ul>
                    </div>
                    <div className="quiz">
                        <div className="quit-section">
                            <div className="quit">
                                <a href="" data-toggle="modal" data-target="#quitModal">
                                    {" "}
                                    <i className="fa fa-stop-circle"></i> Quit
                                </a>
                            </div>
                        </div>
                        <div className="modal" id="quitModal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <button
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                        >
                                            &times;
                                        </button>
                                        <div className="title">Are you sure you want to Quit the Quiz?
                                        </div>
                                        <span style={{ color: 'red' }}> Your attempt will be deducted and the data will not be Saved</span>

                                        <div className="button-container">
                                            <a
                                                href=""
                                                onClick={handleQuit}
                                                data-dismiss="modal"
                                                className="yes"
                                            >
                                                Yes
                                            </a>
                                            <a href="" className="no" data-dismiss="modal">
                                                No{" "}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="quiz-header">
                            <nav
                                className="navbar navbar-expand-sm"
                                style={{
                                    background: "linear-gradient(45deg, #0be788, #09d6af)",
                                    boxShadow: "0px 2px 4px #a1a4a4"
                                }}
                            ></nav>
                            { QuizTime ?
                                <Timer myTime={QuizTime} Timeup={submitPractise} /> :
                                null
                            } 
                            
                        </div>

                        {questions.length > 0 ? (
                            <>
                                <div className="container question test-section">
                                    <div className="question-container">
                                        <div className="question-title">
                                            <span className="question-number">
                                                {currentQuestionIndex + 1}.
                                            </span>
                                            {currentQuestion.initialQuestion &&
                                                currentQuestion.initialQuestion.name}
                                        </div>
                                    </div>
                                    <div className="answer-container">
                                        {currentQuestion.initialQuestion && (
                                            <div className="row">
                                                <div className="col-md-6 col-sm-6">
                                                    <div
                                                        className={
                                                            "answer-wrapper" +
                                                            " " +
                                                            (is_active(
                                                                currentQuestionIndex,
                                                                currentQuestion.initialQuestion.answers[0].id
                                                            )
                                                                ? "active"
                                                                : "")
                                                        }
                                                        onClick={() =>
                                                            handleChange(
                                                                currentQuestion.initialQuestion.answers[0]
                                                                    .correct,
                                                                currentQuestionIndex,
                                                                currentQuestion.initialQuestion.answers[0].id
                                                            )
                                                        }
                                                    >
                                                        <div className="option-number">A</div>
                                                        <div className="option">
                                                            {currentQuestion.initialQuestion.answers[0].name}
                                                        </div>
                                                        <div className="option-tick">
                                                            <i className="fa fa-check"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div
                                                        className={
                                                            "answer-wrapper" +
                                                            " " +
                                                            (is_active(
                                                                currentQuestionIndex,
                                                                currentQuestion.initialQuestion.answers[1].id
                                                            )
                                                                ? "active"
                                                                : "")
                                                        }
                                                        onClick={() =>
                                                            handleChange(
                                                                currentQuestion.initialQuestion.answers[1]
                                                                    .correct,
                                                                currentQuestionIndex,
                                                                currentQuestion.initialQuestion.answers[1].id
                                                            )
                                                        }
                                                    >
                                                        <div className="option-number">B</div>
                                                        <div className="option">
                                                            {currentQuestion.initialQuestion.answers[1].name}
                                                        </div>
                                                        <div className="option-tick">
                                                            <i className="fa fa-check"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div
                                                        className={
                                                            "answer-wrapper" +
                                                            " " +
                                                            (is_active(
                                                                currentQuestionIndex,
                                                                currentQuestion.initialQuestion.answers[2].id
                                                            )
                                                                ? "active"
                                                                : "")
                                                        }
                                                        onClick={() =>
                                                            handleChange(
                                                                currentQuestion.initialQuestion.answers[2]
                                                                    .correct,
                                                                currentQuestionIndex,
                                                                currentQuestion.initialQuestion.answers[2].id
                                                            )
                                                        }
                                                    >
                                                        <div className="option-number">C</div>
                                                        <div className="option">
                                                            {currentQuestion.initialQuestion.answers[2].name}
                                                        </div>
                                                        <div className="option-tick">
                                                            <i className="fa fa-check"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6">
                                                    <div
                                                        className={
                                                            "answer-wrapper" +
                                                            " " +
                                                            (is_active(
                                                                currentQuestionIndex,
                                                                currentQuestion.initialQuestion.answers[3].id
                                                            )
                                                                ? "active"
                                                                : "")
                                                        }
                                                        onClick={() =>
                                                            handleChange(
                                                                currentQuestion.initialQuestion.answers[3]
                                                                    .correct,
                                                                currentQuestionIndex,
                                                                currentQuestion.initialQuestion.answers[3].id
                                                            )
                                                        }
                                                    >
                                                        <div className="option-number">D</div>
                                                        <div className="option">
                                                            {currentQuestion.initialQuestion.answers[3].name}
                                                        </div>
                                                        <div className="option-tick">
                                                            <i className="fa fa-check"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="button-section">
                                    <div className="container">
                                        <div className="button-row justify-content-between">
                                            {currentQuestionIndex > 0 ? (
                                                <div
                                                    className="prev-btn"
                                                    onClick={() =>
                                                        setCurrentQuestionIndex(currentQuestionIndex - 1)
                                                    }
                                                >
                                                    <i className="fa fa-arrow-circle-left"></i>
                                                    <span>Previous</span>
                                                </div>
                                            ) : (
                                                <div className="prev-btn" style={{ display: "none" }}>
                                                    <i className="fa fa-arrow-circle-left"></i>
                                                    <span>Previous</span>
                                                </div>
                                            )}
                                            {currentQuestionIndex + 1 != allQuestion ? (
                                                <div
                                                    className="next-btn"
                                                    onClick={() =>
                                                        setCurrentQuestionIndex(currentQuestionIndex + 1)
                                                    }
                                                >
                                                    <span> Next</span>{" "}
                                                    <i className="fa fa-arrow-circle-right" />
                                                </div>
                                            ) : (
                                                <div className="next-btn" onClick={submitPractise}>
                                                    <span> Finish </span>
                                                    <i className="fa fa-arrow-circle-right" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="container test-section">
                                    <div className="question-container">
                                        <div className="question-title">
                                            <span className="question-number">
                                                <Skeleton></Skeleton>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="answer-container">
                                            <div className="row">
                                                { [1,2,3,4].map((val,index) => { return(
                                                <div className="col-md-6 col-sm-6">
                                                    <div
                                                        className=
                                                            "answer-wrapper"
                                                    >
                                                        <div className="option-number">{index+1}</div>
                                                        <div className="option">
                                                            <Skeleton></Skeleton>
                                                        </div>
                                                        <div className="option-tick">
                                                            <i className="fa fa-check"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                );})}
                                            </div>
                                    </div>
                                </div>
                                
                            </>
                        )}
                    </div>

                    <div className="progress-container">
                        <div className="progress">
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                    width: (currentQuestionIndex / allQuestion) * 100 + "%"
                                }}
                                aria-valuenow="75"
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                    </div>
                </div>
            </Route>
            {/* <Route path="/:class_id/:subjectId/result" component={SubjectResult}	/> */}

            <Route path={`${path}/result`}>
                <SubjectResult result={ResultResponse} />
            </Route>
            
        </React.Fragment>
    );
}

function useCurrentQuestion(initialValue, questions, quizLength) {
    const allQuestion = questions.length;
    const [initialQuestion, setQuestions] = useState(questions[initialValue]);
    useEffect(() => {
        localStorage.setItem("initialValue", JSON.stringify(initialValue));
        setQuestions(questions[initialValue]);
    }, [initialValue, quizLength]);
    return {
        initialValue,
        initialQuestion,
        allQuestion
    };
}

function useMarkCounter(myMarks) {
    const Total = myMarks.reduce((a, b) => a + b, 0);
    return Total;
}


